const fetch = require('node-fetch');
const constants = require('../constants.json');
const Models = require('../../models');

const adminCancelBookingHandler = (authorization, pnr) => {
  const requestUrl = `https://dev.allmyles.com/v2.0/books/${pnr}`;
  const apiKey = constants.API_KEY;
  const requestConfig = {
    method: 'delete',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: constants.TEST_COOKIE,
      'Content-Type': 'application/json',
    },
  };

  return fetch(requestUrl, requestConfig)
    .then(response => response.text())
    .then((respText) => { console.log(respText); return JSON.parse(respText); })
    .then((respJSON) => {
      if (respJSON.result.reservationState === 'CANCELLED') {
        return Models.bookings.update({ status: 'CANCELLED' }, { where: { bookingid: pnr } })
          .then((resultArray) => {
            if (resultArray[0] === 1) {
              return 'Cancelled';
            }

            return 'Confirmed';
          });
      }

      return 'Confirmed';
    })
    .catch(() => 'Error');
};

module.exports = adminCancelBookingHandler;
