const express = require('express');
const scrapeRoute = require('./routes/global_search/scrape');
const rateMyProfessorRoute = require('./routes/rate_my_professor/rateMyProfessor'); // Import the new route
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/api/scrape', scrapeRoute);
app.use('/api/rate_my_professor', rateMyProfessorRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
