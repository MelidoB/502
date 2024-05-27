// sharedAxios.js
const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

// Create a cookie jar to maintain session state
const jar = new CookieJar();
// Wrap axios with cookie jar support
const client = wrapper(axios.create({ jar }));

module.exports = client;
