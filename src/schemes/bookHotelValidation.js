const Joi = require('joi');

const addressObj = Joi.object({
  addressLine1: Joi.string().example('Flat Number'),
  addressLine2: Joi.string().example('Colony'),
  addressLine3: Joi.string().example('Locality'),
  cityName: Joi.string().example('Bangalore'),
  zipCode: Joi.string().example('560048'),
  countryCode: Joi.string().example('IN'),
  province: Joi.string().example('Karnataka'),
});
const phoneNumberRegEx = /^\d{10}$/;
const dateRegEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;

const personObj = Joi.object({
  namePrefix: Joi.string().min(1).max(4).required()
    .example('Mr'),
  firstName: Joi.string().required().example('Firstname'),
  lastName: Joi.string().required().example('Lastname'),
  birthDate: Joi.string().required().example('1997-03-21'),
  room_index: Joi.string().required().example('0'),
  passengerTypeCode: Joi.string().required().regex(/^(ADT|CHD)$/).example('ADT'),
  baggage: Joi.string().required().regex(/^[0-9]+$/),
});

module.exports = Joi.object({
  bookBasket: Joi.array().min(1).items(Joi.string()).required()
    .example('[cas631bf263]'),
  address: addressObj,
  email: Joi.string().email().required().example('someuser@gmail.com'),
  firstName: Joi.string().required().example('Firstname'),
  lastName: Joi.string().required().example('Lastname'),
  phoneNumber: Joi.string().required().example('9899877654'),
  persons: Joi.array().min(1).items(personObj).required(),
  amount: Joi.number().required().example('450'),
  hotelname: Joi.string().required().example('JW Marriott'),
  checkin: Joi.string().required().example('2018-03-21'),
  checkout: Joi.string().required().example('2018-03-24'),
  city: Joi.string().example('Bangalore'),
});
