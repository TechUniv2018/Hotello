const fetch = require('node-fetch');
const constants = require('../constants.json');
const Models = require('../../models');

const cancelBookingHandler = (authorization, sessionId, pnr) => {
  const requestUrl = `https://dev.allmyles.com/v2.0/books/${pnr}`;
  const apiKey = constants.API_KEY;
  const requestConfig = {
    method: 'delete',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: sessionId,
      'Content-Type': 'application/json',
    },
  };

  return fetch(requestUrl, requestConfig)
    .then(response => response.text())
    .then((respText) => { console.log(respText); return JSON.parse(respText); })
    .then((respJSON) => {
      console.log('respJSON', respJSON);
      if (respJSON.result.reservationState === 'CANCELLED') {
        return Models.bookings.update({ status: 'CANCELLED' }, { where: { bookingid: pnr } })
          .then((resultArray) => {
            console.log(resultArray);
            if (resultArray[0] === 1) {
              return 'Cancelled';
            }
            return 'Not found';
          });
      }

      return 'Confirmed';
    })
    .catch(() => 'Error');
};

module.exports = cancelBookingHandler;
