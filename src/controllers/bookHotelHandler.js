const fetch = require('node-fetch');
const constants = require('../constants.json');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

const bookHotelHandler = (authorization, payload) => {
  console.log('asds');
  const decodedToken = jwt.decode(authorization, constants.JWT_SECRET);
  const requestUrl = 'https://dev.allmyles.com/v2.0/books';
  const apiKey = constants.API_KEY;
  const personsArr = [
    {
      birthDate: '1974-04-03',
      email: 'aaa@gmail.com',
      firstName: 'Janos',
      gender: 'MALE',
      lastName: 'Kovacs',
      namePrefix: 'Mr',
      passengerTypeCode: 'ADT',
      baggage: '0',
      document: {
        id: '123456',
        type: 'Passport',
        dateOfExpiry: '2018-11-14',
        issueCountry: 'RS',
      },
      room_index: '0',
    },
    {
      birthDate: '1974-05-03',
      email: 'aaa@gmail.com',
      firstName: 'Istvan',
      gender: 'MALE',
      lastName: 'Kovacs',
      namePrefix: 'Mr',
      passengerTypeCode: 'ADT',
      baggage: '0',
      document: {
        id: '103456',
        type: 'Passport',
        dateOfExpiry: '2018-11-14',
        issueCountry: 'RS',
      },
      room_index: '0',
    },
    {
      birthDate: '2010-04-03',
      email: 'aaa@gmail.com',
      firstName: 'Tiga',
      gender: 'MALE',
      lastName: 'Kovacs',
      namePrefix: 'Mr',
      passengerTypeCode: 'CHD',
      baggage: '0',
      document: {
        id: '122456',
        type: 'Passport',
        dateOfExpiry: '2018-11-14',
        issueCountry: 'RS',
      },
      room_index: '1',
    },
  ];
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
    persons: personsArr,
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
      Cookie: constants.TEST_COOKIE,
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
      bookingDate: dateonly,
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
