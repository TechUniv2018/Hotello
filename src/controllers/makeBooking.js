const fetch = require('node-fetch');
const xSigGenerator = require('../helpers/xSignatureGenerator');
const getUserDetails = require('../helpers/getUserName');
// const rp = require('request-promise');

const makeBookingHandler = (authorization, requestObj) => {
  const userPromise = getUserDetails(authorization);
  return userPromise.then((userObj) => {
    const bookingBody = {
      holder: {
        name: userObj.firstName,
        surname: userObj.lastName,
      },
      rooms: requestObj.rooms,
      clientReference: userObj.email,
      remark: '',
    };
    const bookingUrl = 'https://api.test.hotelbeds.com/hotel-api/1.0/bookings';
    const apiKey = 'rzgqtb3qnpzdkrw2s2u5swmd';
    const xSignature = xSigGenerator();
    const requestConfig = {
      method: 'POST',
      body: JSON.stringify(bookingBody),
      headers: {
        'content-type': 'application/json',
        'Api-key': apiKey,
        'X-Signature': xSignature,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
      },
    };
    return fetch(bookingUrl, requestConfig)
      .then(response => console.log('response', response))
      .then(respJson => respJson.booking)
      .catch(e => console.log('error:', e));
  });
};
module.exports = makeBookingHandler;
