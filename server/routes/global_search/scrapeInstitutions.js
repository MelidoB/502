// scrapeInstitutions.js
const client = require('./sharedAxios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeInstitutions() {
  const response = await client.get('https://globalsearch.cuny.edu/CFGlobalSearchTool/search.jsp');
  const $ = cheerio.load(response.data);

  const institutions = [];
  $('input[name="inst_selection"]').each((index, element) => {
    const instName = $(element).next('label').text().trim();
    const instCode = $(element).attr('value');
    if (instName && instCode) {
      institutions.push({ code: instCode, name: instName });
    }
  });

  const filePath = path.join(__dirname, 'institutions.json');
  fs.writeFileSync(filePath, JSON.stringify(institutions, null, 2));
  return institutions;
}

module.exports = scrapeInstitutions;
