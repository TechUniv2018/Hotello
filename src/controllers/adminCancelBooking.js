const fetch = require('node-fetch');
const JWT = require('jsonwebtoken');
const Models = require('../../models');
const xSigGenerator = require('../helpers/xSignatureGenerator');
const constants = require('../constants.json');

function cancelBooking(token, payload) {
  const { bookingid, email } = payload;
  const apiUrl = 'https://api.test.hotelbeds.com/hotel-api/1.0/bookings/';
  console.log('inside controller:', bookingid);
  const reqUrl = `${apiUrl}${bookingid}?cancellationFlag=SIMULATION&language=ENG`;
  console.log('inside controller: \n', reqUrl);
  const apiKey = constants.API_KEY;
  const xSignature = xSigGenerator();
  const requestConfig = {
    method: 'DELETE',
    headers: {
      'Api-key': apiKey,
      'X-Signature': xSignature,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
    },
  };
  const promise = new Promise((resolve, reject) => {
    Models.bookings.find({
      where: {
        bookingid,
        email,
      },
    }).then(() => {
      console.log('making fetch', reqUrl);
      fetch(reqUrl, requestConfig)
        .then(response => response.json())
        .then((respJson) => {
          console.log(respJson.booking.status);
          if (respJson.booking.status === 'CANCELLED') {
            Models.bookings.destroy({
              where: {
                bookingid,
              },
            }).then((record) => {
              resolve({ bookingDetails: record, msg: 'booking cancelled' });
            });
          } else {
            reject(Error('Not cancelled, try again'));
          }
        })
        .catch(() => reject(Error('Error in fetching')));
    })
      .catch(() => reject(Error('No booking found with this user')));
  });
  return promise;
}

module.exports = cancelBooking;
