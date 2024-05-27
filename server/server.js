const express = require('express');
const scrapeRoute = require('./routes/global_search/scrape');
const rateMyProfessorRoute = require('./routes/rate_my_professor/rateMyProfessor');
const createSchedulesRoute = require('./routes/create_schedules/create_schedules'); // Correct the path to the new route
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies
app.use('/api/scrape', scrapeRoute);
app.use('/api/rate_my_professor', rateMyProfessorRoute);
app.use('/api/create_schedules', createSchedulesRoute); // Add the new route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
