const fetch = require('node-fetch');
const constants = require('../constants.json');

const getRoomDetailsHandler = (authorization, hotelId, roomId) => {
  const requestUrl = `https://dev.allmyles.com/v2.0/hotels/${hotelId}/rooms/${roomId}`;
  const apiKey = constants.API_KEY;
  const requestConfig = {
    method: 'GET',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: constants.TEST_COOKIE,
      'Content-Type': 'application/json',
    },
  };
  console.log('c:::::', requestConfig, requestUrl);
  // const result = new Promise((resolve, reject))
  // return axios.get(requestUrl, {
  //   headers: {
  //     'X-Auth-Token': apiKey,
  //     Cookie: constants.TEST_COOKIE,
  //     'Content-Type': 'application/json',
  //   },
  // }).then((response) => {
  //   console.log(response.data);
  //   return response.data;
  // });
  return fetch(requestUrl, requestConfig)
    .then((response) => { console.log(response); return response.text(); })
    .then((respJson) => { console.log('a:::', respJson); return respJson; })
    .catch((e) => { console.log(e); return 'Error'; });
};

module.exports = getRoomDetailsHandler;
