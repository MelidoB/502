// scrapeSearchResults.js
const client = require('./sharedAxios');
const getSearchPayload = require('./searchPayload');
const handleResponse = require('./responseHandler');
const fs = require('fs');
const path = require('path');

async function scrapeSearchResults(subject) {
  const searchPayload = getSearchPayload(subject);

  try {
    const response = await client.post('https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController', searchPayload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Log the status code and response snippet
    console.log('Search results page reached, status code:', response.status);
    const snippet = response.data.slice(0, 500); // Log the first 500 characters
    console.log('HTML snippet:', snippet);

    // Save the entire HTML response to a file for inspection
    const htmlFilePath = path.join(__dirname, 'searchResultsFull.html');
    fs.writeFileSync(htmlFilePath, response.data, 'utf-8');
    console.log(`Full HTML response saved to ${htmlFilePath}`);

    const results = await handleResponse(response);
   
    return results;
  } catch (error) {
    console.error('Error scraping search results:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    return 'Failed to reach the page';
  }
}

module.exports = scrapeSearchResults;
