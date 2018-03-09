const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');

const expectedObj = {
  hotel_details: {
    thumbnail: 'https://az712897.vo.msecnd.net/images/full/29bba53e-c9c3-4ca5-a65b-ece3b584c86c.jpeg',
    chain_name: '',
    price: {
      maximum: 130.7173,
      minimum: 130.7173,
      currency: 'USD',
    },
    minimum_price_in_preferred_currencies: [],
    maximum_price_in_preferred_currencies: [],
    distance: 2.3,
    hotel_name: 'Mango Hotels Prangan',
    description: "With a stay at Prangan by Mango Hotels in Bhubaneshwar, you'll be near the airport and close to Orissa State Museum and Rajarani Temple. This hotel is within close proximity of Muktesvara Temple and Siddhesvara Temple.Make yourself at home in one of the 45 air-conditioned rooms featuring minibars and flat-screen televisions. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms have showers and complimentary toiletries. Conveniences include phones, as well as safes and desks.Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.Enjoy a meal at a restaurant or in a coffee shop/café. Or stay in and take advantage of the hotel's 24-hour room service. Quench your thirst with your favorite drink at a bar/lounge.Featured amenities include a business center, express check-in, and express check-out. A roundtrip airport shuttle is provided for a surcharge (available 24",
    chain_code: '',
    rules: {},
    points_of_interest: [],
    hotel_code: '3117526',
    contact_info: {
      website: '',
      phone_numbers: [],
      email: '',
    },
    rooms: [
      {
        description: [
          '',
          '',
        ],
        price_in_preferred_currencies: [],
        bed_type: '',
        board_category: 'no_meal',
        booking_id: '119ff031-5968-405b-89e0-cc3137b7e9a2',
        room_id: '119ff031-5968-405b-89e0-cc3137b7e9a2',
        quantity: null,
        board: '',
        price: {
          covers: 'trip',
          amount: 130.7173,
          rate_varies: false,
          currency: 'USD',
        },
        room_type: {},
      },
    ],
    amenities: {
      '24 Hour Front Desk': true,
      Safe: true,
      'Dry cleaning service': true,
      'Business Center': true,
      'Bar/Lounge': true,
      'Smoking area': true,
      'Number of floors - under 10': true,
      'Laundry Service': true,
      Coffee: true,
      Surcharge: true,
      'Express check in': true,
      'Free car parking': true,
      'Total number of rooms 1 - 50': true,
      'Free newspaper': true,
      Concierge: true,
      'Express check out': true,
      'Luggage storage': true,
      'Restaurant(s)': true,
      'Meeting room': true,
    },
    stars: '3',
    location: {
      city: 'Bhubaneshwar',
      state: '',
      zip_code: '',
      country: 'India',
      address: '751006 Bhubaneshwar, Plot No 692 Cuttack Road',
      recommended_transport: '',
      area: '',
    },
    photos: [
      'https://az712897.vo.msecnd.net/images/full/8a232d17-0ea0-4898-9301-d3d9b740700e.jpeg',
      'https://az712897.vo.msecnd.net/images/full/855cc827-3141-429c-9f34-c865a7773780.jpeg',
      'https://az712897.vo.msecnd.net/images/full/8dd5e1c9-0539-4cce-a262-dcabb1648848.jpeg',
      'https://az712897.vo.msecnd.net/images/full/81847f79-0688-4a6c-9b8c-71a76282d23b.jpeg',
      'https://az712897.vo.msecnd.net/images/full/bdd1f78d-3df5-4089-a1aa-f07ac59ba6dd.jpeg',
      'https://az712897.vo.msecnd.net/images/full/8ba88ca1-ad79-4542-9c34-e597279b66cd.jpeg',
      'https://az712897.vo.msecnd.net/images/full/57392056-21df-4c45-ae50-5617c6c7986f.jpeg',
      'https://az712897.vo.msecnd.net/images/full/6a3cac30-d0b0-40cd-b108-de2782878a4e.jpeg',
      'https://az712897.vo.msecnd.net/images/full/59bd04a4-9d0e-4d1e-8929-88f54a993c4f.jpeg',
      'https://az712897.vo.msecnd.net/images/full/83da7a94-adaa-45df-a241-e5f43e2ae4ba.jpeg',
      'https://az712897.vo.msecnd.net/images/full/c41615d2-922e',
    ],
  },
};
// fetch.mockResp onse(JSON.stringify(expectedObj));


describe('Testing viewHotelDetails route ', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 3000);
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with no hotel ID, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });


  it('Testing for request with proper hotel id, checking if response is hotel details object', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/13425',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      // console.log(JSON.parse(response.payload));
      // expect(Object.keys(JSON.parse(response.payload))).toContain('rooms');
      // expect(Object.keys(JSON.parse(response.payload))).toContain('country');
      // expect(Object.keys(JSON.parse(response.payload))).toContain('address');
      console.log(response.payload);
      expect(JSON.parse(response.payload)).toEqual(expectedObj);
      done();
    });
  });
});
