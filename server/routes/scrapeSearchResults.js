const axios = require('axios');
const getSearchPayload = require('./searchPayload');
const handleResponse = require('./responseHandler');

async function scrapeSearchResults(subject) {
  const searchPayload = getSearchPayload(subject);

  try {
    const response = await axios.post('https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController', searchPayload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9,es;q=0.8,es-US;q=0.7,ja;q=0.6',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Length': '587',
        'Cookie': '_scid=40a01fb5-3b54-4e5c-b133-24c78dc35151; _pin_unauth=dWlkPU9HWmlNVGd4WVRRdE5HSm1OUzAwTVRnNExUbGlaRFl0WWpSa09XRTVaRE5pT1RJdw; __qca=P0-1116730847-1684605328645; _ga_1NF8J0M1N2=GS1.1.1692993567.2.0.1692993573.0.0.0; _hjSessionUser_2992355=eyJpZCI6IjI3MGYyOTg4LTUzOGYtNTA2ZS05NTM3LWFkNzg1N2E3Mjc1NiIsImNyZWF0ZWQiOjE2OTc2NzIxODU1ODgsImV4aXN0aW5nIjp0cnVlfQ==; _ga_6EZLV6X01P=GS1.2.1697672185.1.0.1697672186.59.0.0; _ga_968LDL13BH=GS1.1.1697674541.2.0.1697674541.60.0.0; _ga_NZDPTEVEYX=GS1.1.1699461845.1.0.1699461845.0.0.0; _ga_2KQWMVQZW9=GS1.1.1702844721.2.0.1702846157.0.0.0; _ga_Q5B3QY3FTL=GS1.1.1705963179.4.1.1705963201.38.0.0; _ga_8R7N5DTPR7=GS1.1.1708810933.1.1.1708810956.0.0.0; AMCV_4D6368F454EC41940A4C98A6%40AdobeOrg=1075005958%7CMCIDTS%7C19782%7CMCMID%7C60386717170392093190443728804368336400%7CMCAAMLH-1709685530%7C7%7CMCAAMB-1709685530%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1709087930s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.1; amplitude_id_1d890e80ea7a0ccc43c2b06438458f50cuny.edu=eyJkZXZpY2VJZCI6ImI1Y2RmOTUxLTYyN2UtNDBjNi1iMTQ1LTM2NjZjYzJmYjg4OVIiLCJ1c2VySWQiOm51bGwsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTcwOTA4MDczMDU3NiwibGFzdEV2ZW50VGltZSI6MTcwOTA4MDczMDU3NiwiZXZlbnRJZCI6MCwiaWRlbnRpZnlJZCI6MCwic2VxdWVuY2VOdW1iZXIiOjB9; s_pers=%20v8%3D1709080730704%7C1803688730704%3B%20v8_s%3DFirst%2520Visit%7C1709082530704%3B%20c19%3Dbpdg%253Air_series%253Aarticle%7C1709082530707%3B%20v68%3D1709080730455%7C1709082530709%3B; _ga_8KYXGYD3QZ=GS1.1.1709582172.1.0.1709582173.0.0.0; _ga_GM1GW5KNBW=GS1.1.1709582583.46.0.1709582583.60.0.0; _ga_QNS6EGVPGE=GS1.2.1716388939.2.0.1716388939.0.0.0; _gcl_au=1.1.1432948698.1716477959; _rdt_uuid=1706888213642.e75212ad-913d-417a-93cd-a288287345fb; _rdt_em=0000000000000000000000000000000000000000000000000000000000000001; _scid_r=40a01fb5-3b54-4e5c-b133-24c78dc35151; FSAV=4124048111.128631694.1684605329.1714521553.1716477959.26.; FSAC=4124048111.1716477959.utmcsr%3Dportaldown.cuny.edu%7Cutmccn%3D(referral)%7Cutmccmd%3Dreferral%7Cutmcct%3D%2F; _derived_epik=dj0yJnU9dURCZFJ3aS1TZ00xNE1UQ2NUdTBwSThDVm9LVTR4WUQmbj0xSUlrVmVuUUJVUENYV3ZPejNJYnVBJm09MSZ0PUFBQUFBR1pQWUFjJnJtPTEmcnQ9QUFBQUFHWlBZQWMmc3A9Mg; _sctr=1%7C1716436800000; _ga_2FC29CB2GG=GS1.1.1716477959.23.0.1716477968.51.0.0; _ga_DBCZ4RJZ11=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_322Y3QXBE3=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_1X8GZ19PJH=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_MRR169QD7K=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_TTM8V9L62D=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_D29E1B0ZXD=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_DEPBYPEMZ1=GS1.1.1716477959.23.0.1716477969.0.0.0; _ga_EPB5L90TZH=GS1.1.1716486565.3.1.1716486581.0.0.0; mp_1ba0a00a73c8e773e7b32dfb33c3a5c6_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A1881bfdf50d32c-034461bb40244c-26031a51-144000-1881bfdf50d32d%22%2C%22%24device_id%22%3A%20%221881bfdf50d32c-034461bb40244c-26031a51-144000-1881bfdf50d32d%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fmath.sci.ccny.cuny.edu%2F%22%2C%22%24initial_referring_domain%22%3A%20%22math.sci.ccny.cuny.edu%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fmath.sci.ccny.cuny.edu%2F%22%2C%22%24initial_referring_domain%22%3A%20%22math.sci.ccny.cuny.edu%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; _ga=GA1.1.1161061556.1684096808; _ga_N7NLZ65W5Z=GS1.1.1716519996.1.1.1716520002.0.0.0; JSESSIONID=000119a-ljdk-0RSJ1k9ktAoX_o:-204HQJ; shortscc=37',
      }
    });

    const results = handleResponse(response);
    return results;
  } catch (error) {
    console.error('Error scraping search results:', error.message);
    return 'Failed to reach the page';
  }
}

module.exports = scrapeSearchResults;
