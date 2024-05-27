// makeRequest.js
const client = require('./sharedAxios');

async function makeRequest(searchPayload) {
  return await client.post('https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController', searchPayload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8,es-US;q=0.7,ja;q=0.6',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Content-Length': '587',
      'Host': 'globalsearch.cuny.edu',
      'Origin': 'https://globalsearch.cuny.edu',
      'Referer': 'https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController',
      'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    }
  });
}

module.exports = makeRequest;
