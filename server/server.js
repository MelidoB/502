const express = require('express');
const scrapeRoute = require('./routes/scrape');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/api/scrape', scrapeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});