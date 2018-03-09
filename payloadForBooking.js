const addressObj = {
  addressLine1: 'Flat Number',
  addressLine2: 'Colony',
  addressLine3: 'Locality',
  cityName: 'Bangalore',
  zipCode: '560048',
  countryCode: 'IN',
  province: 'Karnataka',
};
const personObj1 = {
  namePrefix: 'Mr',
  firstName: 'Firstname1',
  lastName: 'Lastname1',
  birthDate: '1997-03-21',
  room_index: '0',
  passengerTypeCode: 'ADT',
  baggage: '0',
};
const personObj2 = {
  namePrefix: 'Mrs',
  firstName: 'Firstname2',
  lastName: 'Lastname2',
  birthDate: '2005-03-22',
  room_index: '0',
  passengerTypeCode: 'CHD',
  baggage: '0',
};
const personObj3 = {
  namePrefix: 'Mrs',
  firstName: 'Firstname3',
  lastName: 'Lastname3',
  birthDate: '1997-03-21',
  room_index: '1',
  passengerTypeCode: 'ADT',
  baggage: '0',
};
const payload = {
  bookBasket: ['2f41b259-7f30-4b4c-84be-41142e278394'],
  address: addressObj,
  email: 'someuser@gmail.com',
  firstName: 'Firstname',
  lastName: 'Lastname',
  phoneNumber: '9899877654',
  persons: [personObj1, personObj2, personObj3],
  amount: '450',
  hotelname: 'JW Marriott',
  checkin: '2018-03-21',
  checkout: '2018-03-24',
  city: 'Bangalore',
};

module.exports = payload;

