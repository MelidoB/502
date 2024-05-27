// scrape.js
const express = require('express');
const scrapeInstitutions = require('./scrapeInstitutions');
const scrapeTerms = require('./scrapeTerms');
const scrapeSubjects = require('./scrapeSubjects');
const scrapeSearchResults = require('./scrapeSearchResults');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Step 1: Scrape institutions and terms
    const institutions = await scrapeInstitutions();
    const terms = await scrapeTerms();

    if (institutions.length === 0 || terms.length === 0) {
      throw new Error('No institutions or terms found');
    }

    // Log institutions and terms for debugging
    console.log('Institutions:', institutions);
    console.log('Terms:', terms);

    // Step 2: Use the first institution and term to find subjects
    const firstInstitution = institutions[0];
    const firstTerm = terms[0];
    console.log(`Using institution: ${firstInstitution.name} (${firstInstitution.code})`);
    console.log(`Using term: ${firstTerm.text} (${firstTerm.value})`);

    const subjects = await scrapeSubjects(firstInstitution.code, firstTerm.value);

    if (subjects.length === 0) {
      throw new Error('No subjects found');
    }

    // Log subjects for debugging
    console.log('Subjects:', subjects);

    // Step 3: Use the first subject to scrape the search results
    const firstSubject = subjects[0];
    console.log(`Using subject: ${firstSubject.text} (${firstSubject.value})`);

    const courses = await scrapeSearchResults(firstSubject);

    // Check if courses were successfully scraped
    if (!Array.isArray(courses) || courses.length === 0) {
      throw new Error('No courses found');
    }

    // Send the combined JSON response
    res.json({ institutions, terms, subjects, courses });
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'An error occurred while scraping', details: error.message });
  }
});

module.exports = router;
