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
    .then(res => res.text())
    .then((resText) => {
      if (resText === '') {
        return 'Successful';
      }

      return resText;
    })
    .then((resText) => { console.log(resText); return resText; })
    .catch(() => 'Error');
};

module.exports = makePaymentHandler;
