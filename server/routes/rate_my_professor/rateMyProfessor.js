const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const path = require('path');
const School = require('./School');
const Professor = require('./Professor');
const router = express.Router();

async function fetchProfessorIds(collegeId, professorName, numPages = 10) {
  const encodedProfessorName = encodeURIComponent(professorName);
  const urls = [];

  for (let i = 1; i <= numPages; i++) {
    const url = `https://www.ratemyprofessors.com/search/professors/${collegeId}?q=${encodedProfessorName}&page=${i}`;
    urls.push(url);
  }

  const results = await Promise.all(urls.map(async url => {
    try {
      const response = await axios.get(url);
      const data = response.data.match(/"legacyId":(\d+)/g);
      return data ? data.map(prof => parseInt(prof.match(/\d+/)[0])) : [];
    } catch (error) {
      console.error(`Error fetching professor IDs from URL ${url}:`, error);
      return [];
    }
  }));

  const allProfessorIds = [...new Set(results.flat())];

  console.log(`Fetched ${allProfessorIds.length} unique professor IDs for name "${professorName}" at college ID ${collegeId}`);
  return allProfessorIds;
}

async function getProfessorDetails(legacyId) {
  try {
    const url = `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${legacyId}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const name = $('.NameTitle__Name-dowf0z-0.cfjPUG').text().split(' ');
    const firstName = name[0];
    const lastName = name.slice(1).join(' ');
    const overallRating = parseFloat($('.RatingValue__Numerator-qw8sqy-2.liyUjw').text());
    const department = $('.TeacherDepartment__StyledDepartmentLink-fl79e8-0.iMmVHb').text();
    const numRatings = parseInt($('a[href="#ratingsList"]').text().split(' ')[0]);
    const wouldTakeAgain = parseInt($('.FeedbackItem__FeedbackNumber-uof32n-1.kkESWs').first().text().replace('%', ''));
    const difficulty = parseFloat($('.FeedbackItem__FeedbackNumber-uof32n-1.kkESWs').eq(1).text());
    const profileUrl = url;

    return new Professor(legacyId, firstName, lastName, numRatings, overallRating, department, wouldTakeAgain, difficulty, profileUrl);
  } catch (error) {
    console.error(`Error fetching details for professor with ID ${legacyId}:`, error);
    return null;
  }
}

async function getAllProfessorsWithDetails(collegeId, professorName) {
  const professorIds = await fetchProfessorIds(collegeId, professorName);

  const professorDetailsPromises = professorIds.map(id => getProfessorDetails(id));
  const allProfessorDetails = await Promise.all(professorDetailsPromises);

  return allProfessorDetails.filter(prof => prof !== null);
}

async function findMostAccurateProfessor(professorName, professors) {
  const names = professors.map(prof => `${prof.firstName} ${prof.lastName}`);
  const matches = stringSimilarity.findBestMatch(professorName, names);
  const bestMatchIndex = matches.bestMatchIndex;

  return professors[bestMatchIndex];
}

async function updateSearchResultsWithRatings() {
  const searchResultsPath = path.join(__dirname, '../global_search/searchResults.json');
  const updatedSearchResultsPath = path.join(__dirname, 'updatedSearchResults.json');
  const searchResults = JSON.parse(fs.readFileSync(searchResultsPath, 'utf-8'));

  const updateResultsPromises = searchResults.map(async (result) => {
    const professorName = result.instructors;
    if (professorName === 'TBA') {
      result.overallRating = null;
      result.numRatings = null;
      result.wouldTakeAgain = null;
      result.difficulty = null;
      result.profileUrl = null;
    } else {
      const allProfessors = await getAllProfessorsWithDetails('222', professorName); // Replace '222' with the actual college ID
      if (allProfessors.length > 0) {
        const mostAccurateProfessor = await findMostAccurateProfessor(professorName, allProfessors);
        result.overallRating = mostAccurateProfessor.overallRating;
        result.numRatings = mostAccurateProfessor.numRatings;
        result.wouldTakeAgain = mostAccurateProfessor.wouldTakeAgain;
        result.difficulty = mostAccurateProfessor.difficulty;
        result.profileUrl = mostAccurateProfessor.profileUrl;
      } else {
        result.overallRating = null;
        result.numRatings = null;
        result.wouldTakeAgain = null;
        result.difficulty = null;
        result.profileUrl = null;
      }
    }
  });

  await Promise.all(updateResultsPromises);

  fs.writeFileSync(updatedSearchResultsPath, JSON.stringify(searchResults, null, 2), 'utf-8');
  console.log('Updated search results with ratings information saved to updatedSearchResults.json');
}

router.get('/updateSearchResults', async (req, res) => {
  try {
    await updateSearchResultsWithRatings();
    res.status(200).json({ message: 'Search results updated with ratings information' });
  } catch (error) {
    console.error('Error updating search results with ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
