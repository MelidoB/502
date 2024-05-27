// responseHandler.js
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Function to create a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function handleResponse(response) {
  const $ = cheerio.load(response.data);
  const results = [];

  // Extract full course names
  const courseNames = [];
  $('div.testing_msg').each((index, element) => {
    const courseName = $(element).find('span').text().trim();
    courseNames.push(courseName);
  });

  // Remove the first element
  courseNames.splice(0, 1);

  // Log course names for debugging
  console.log('Course names:', courseNames);

  // Extract course data
  for (let divIndex = 0; divIndex < $('div[id^="contentDivImg"]').length; divIndex++) {
    const divElement = $('div[id^="contentDivImg"]')[divIndex];
    if (!divElement.attribs.id.includes('_inst')) {
      const courseName = courseNames[divIndex]; // Get the full course name for this div
      for (let tbodyIndex = 0; tbodyIndex < $(divElement).find('.classinfo tbody').length; tbodyIndex++) {
        const tbodyElement = $(divElement).find('.classinfo tbody')[tbodyIndex];
        for (let index = 0; index < $(tbodyElement).find('tr').length; index++) {
          const element = $(tbodyElement).find('tr')[index];
          const classNumber = $(element).find('td[data-label="Class"] a').text().trim();
          const section = $(element).find('td[data-label="Section"]').text().trim();
          const daysAndTimes = $(element).find('td[data-label="DaysAndTimes"]').text().trim();
          const room = $(element).find('td[data-label="Room"]').text().trim();
          const instructorElements = $(element).find('td[data-label="Instructor"]').html();
          const instructors = instructorElements
            ? instructorElements.replace(/<br>/g, ', ').replace(/<\/?[^>]+(>|$)/g, '').trim()
            : '';
          const instructionMode = $(element).find('td[data-label="Instruction Mode"]').text().trim();
          const meetingDates = $(element).find('td[data-label="Meeting Dates"]').text().trim();
          const status = $(element).find('td[data-label="Status"]').text().trim().includes('Open') ? 'Open' : 'Closed';

          results.push({
            classNumber,
            section,
            courseTopic: courseName, // Use the full course name here
            daysAndTimes,
            room,
            instructors,
            instructionMode,
            meetingDates,
            status,
            identifier: `contentDivImg${divIndex}`
          });
        }
        await delay(100); // Add a 100ms delay between each tbody processing
      }
    }
  }

  console.log('Results:', results);

  // Define the path to the JSON file
  const filePath = path.join(__dirname, 'searchResults.json');

  // Write the results to searchResults.json
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Results saved to ${filePath}`);

  return results;
}

module.exports = handleResponse;
