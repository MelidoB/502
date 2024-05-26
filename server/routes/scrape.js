const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Form submission payload
    const payload = new URLSearchParams({
      selectedInstName: 'Baruch College',
      inst_selection: 'BAR01',
      selectedTermName: '2024 Fall Term',
      term_value: '1249',
      next_btn: 'Next'
    });

    // Send the form submission request
    const response = await axios.post('https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Load the response HTML into cheerio
    const $ = cheerio.load(response.data);

    // Scrape text from the select element with id 'subject_ld'
    const subjects = [];
    $('#subject_ld option').each((index, element) => {
      subjects.push($(element).text().trim());
    });

    // Send the scraped data as a response
    res.json(subjects);
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'An error occurred while scraping', details: error.message });
  }
});

module.exports = router;
