const crypto = require('crypto');


const xSignatureGenerator = () => {
  const apiKey = 't6j676c82cc6n58hg6ysur3c';
  const apiSecret = 'v9BeVdsTga';

  //   const currentTime = Math.floor((new Date().getTime()) / 1000);
  //   const inputString = apiKey + apiSecret + currentTime;
  //   const xSignature = crypto.createHash('sha256').update(inputString).digest('hex');
  //   return xSignature;

  const timestamp = Math.floor((new Date()).getTime() / 1000);
  const s = `${apiKey}${apiSecret}${timestamp}`;
  return crypto.createHash('sha256').update(s).digest('hex');
};

module.exports = xSignatureGenerator;

