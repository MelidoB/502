// scrapeTerms.js
const client = require('./sharedAxios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeTerms() {
  const response = await client.get('https://globalsearch.cuny.edu/CFGlobalSearchTool/search.jsp');
  const $ = cheerio.load(response.data);

  const terms = [];
  $('#t_pd option').each((index, element) => {
    const termValue = $(element).attr('value').trim();
    const termText = $(element).text().trim();
    if (termValue && termText) {
      terms.push({ value: termValue, text: termText });
    }
  });

  const filePath = path.join(__dirname, 'terms.json');
  fs.writeFileSync(filePath, JSON.stringify(terms, null, 2));
  return terms;
}

module.exports = scrapeTerms;
