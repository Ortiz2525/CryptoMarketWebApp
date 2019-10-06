'use strict';

const https = require('https');

const coingeckoBaseUrl = 'https://api.coingecko.com/api/v3';

/**
 * Calls the /coins/markets endpoint using the provided currency and page
 *
 * @param {string} currency
 * @param {number} page
 */
const getMarketsPage = async (currency = 'USD', page = 1) => {
  // No need to include an entire http client as dependency only for this, let's keep it as lightweight as possible

  return new Promise((resolve, reject) => {
    https.get(`${coingeckoBaseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=true`, (resp) => {
      let data = [];

      resp.on('data', (chunk) => {
        data = [
          ...data,
          chunk
        ];
      });

      resp.on('end', () => {
        console.log('Request completed'),
        resolve(JSON.parse(data.join('')));
      });

    }).on("error", (err) => {
      console.error(err);
      reject(err);
    });
  });
}

module.exports = {
  getMarketsPage
}