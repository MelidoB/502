const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeSubjects(instCode, termValue) {
  try {
    // Payload to be sent
    const payload = new URLSearchParams({
      inst_selection: instCode,
      term_value: termValue,
      next_btn: 'Next'
    });

    // Send the POST request with the payload
    const response = await axios.post('https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Log the status code and a snippet of the HTML to verify the response
    console.log('Page reached, status code:', response.status);
    const snippet = response.data.slice(0, 500); // Log the first 500 characters
    console.log('HTML snippet:', snippet);

    const $ = cheerio.load(response.data);

    // Log the HTML snippet containing the subjects select element
    console.log('HTML snippet for subjects:', $('#subject_ld').html());

    const subjects = [];
    $('#subject_ld option').each((index, element) => {
      const subjectValue = $(element).attr('value') ? $(element).attr('value').trim() : null;
      const subjectText = $(element).text().trim();
      if (subjectValue && subjectText) {
        subjects.push({ value: subjectValue, text: subjectText });
      }
      // Log each subject element
      console.log('Subject element:', $(element).html());
    });

    // Logging the subjects array to verify it contains data
    console.log('Subjects:', subjects);

    const filePath = path.join(__dirname, 'subjects.json');
    fs.writeFileSync(filePath, JSON.stringify(subjects, null, 2));

    return subjects;
  } catch (error) {
    console.error('Error scraping subjects:', error.message);
    return [];
  }
}

module.exports = scrapeSubjects;
