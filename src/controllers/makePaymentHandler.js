const fetch = require('node-fetch');
const constants = require('../constants.json');

const makePaymentHandler = (authorization, payload) => {
  const requestUrl = 'https://dev.allmyles.com/v2.0/payment';
  const apiKey = constants.API_KEY;
  const reqBody = {
    paymentId: payload.paymentId,
    basket: payload.basket,
    finalPrice: {
      currency: payload.currency,
      amount: payload.amount,
    },
  };
  const requestConfig = {
    method: 'post',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  };

  return fetch(requestUrl, requestConfig)
    .then((res) => {
      if (res.status === 204) {
        return 'Successful';
      }

      return res.text();
    })
    .then(resText => resText)
    .catch(() => 'Error');
};

module.exports = makePaymentHandler;
