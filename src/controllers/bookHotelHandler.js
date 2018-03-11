const fetch = require('node-fetch');
const constants = require('../constants.json');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

const bookHotelHandler = (authorization, sessionId, payload) => {
  console.log('asds');
  const decodedToken = jwt.decode(authorization, constants.JWT_SECRET);
  const requestUrl = 'https://dev.allmyles.com/v2.0/books';
  const apiKey = constants.API_KEY;

  const reqBody = {
    bookBasket: payload.bookBasket,
    billingInfo: {
      address: payload.address,
      email: decodedToken.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: {
        countryCode: '91',
        areaCode: '45',
        phoneNumber: payload.phoneNumber,
      },
    },
    contactInfo: {
      address: payload.address,
      email: decodedToken.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: {
        countryCode: '91',
        areaCode: '45',
        phoneNumber: payload.phoneNumber,
      },
    },
    persons: payload.persons,
    userData: {
      ip: '89.134.155.92',
      browser_agent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
    },


  };
  console.log(reqBody);

  const requestConfig = {
    method: 'post',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: sessionId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  };

  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const dateonly = [year, month, day].join('-');

  return fetch(requestUrl, requestConfig)
    .then((response) => { console.log('b:::::::', response); return response.text(); })
    .then((respText) => { console.log('a::::::::', respText); return JSON.parse(respText); })
    .then(respJson => Models.bookings.create({
      bookingid: respJson.pnr,
      email: decodedToken.email,
      bookingdate: dateonly,
      amount: payload.amount,
      hotelname: payload.hotelname,
      checkin: payload.checkin,
      checkout: payload.checkout,
      numofguests: payload.persons.length,
      numofrooms: payload.bookBasket.length,
      city: payload.city,
      status: 'Confirmed',
    }))
    .then(dbResponse => dbResponse.dataValues)
    .catch(() => 'Error');
};

module.exports = bookHotelHandler;
