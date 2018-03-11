const constants = require('../constants.json');

const crypto = require('crypto');


const xSignatureGenerator = () => {
  const apiKey = constants.API_KEY;
  const apiSecret = constants.API_SECRET;

  //   const currentTime = Math.floor((new Date().getTime()) / 1000);
  //   const inputString = apiKey + apiSecret + currentTime;
  //   const xSignature = crypto.createHash('sha256').update(inputString).digest('hex');
  //   return xSignature;

  const timestamp = Math.floor((new Date()).getTime() / 1000);
  const s = `${apiKey}${apiSecret}${timestamp}`;
  return crypto.createHash('sha256').update(s).digest('hex');
};

module.exports = xSignatureGenerator;
