const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

function handleResponse(response) {
  const $ = cheerio.load(response.data);
  const results = [];

  // Extract full course names
  const courseNames = [];
  $('div.testing_msg').each((index, element) => {
    const courseName = $(element).find('span').text().trim();
    courseNames.push(courseName);
  });

 // Remove the first 3 elements
 courseNames.splice(0, 1);
  // Extract course data
  $('div[id^="contentDivImg"]').each((divIndex, divElement) => { 
    if (!divElement.attribs.id.includes('_inst')) {
      const courseName = courseNames[divIndex]; // Get the full course name for this div
      $(divElement).find('.classinfo tbody').each((tbodyIndex, tbodyElement) => {
        $(tbodyElement).find('tr').each((index, element) => {
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
        });
      });
    }
  });

  // Define the path to the JSON file
  const filePath = path.join(__dirname, 'searchResults.json');

  // Write the results to searchResults.json
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Results saved to ${filePath}`);

  return results;
}

module.exports = handleResponse;
