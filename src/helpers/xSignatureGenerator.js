const crypto = require('crypto');


const xSignatureGenerator = () => {
  const apiKey = 'dtt3mx22k7bvbc3k8p749scr';
  const apiSecret = 'TSA8mwPep7';
  //   const currentTime = Math.floor((new Date().getTime()) / 1000);
  //   const inputString = apiKey + apiSecret + currentTime;
  //   const xSignature = crypto.createHash('sha256').update(inputString).digest('hex');
  //   return xSignature;

  const timestamp = Math.floor((new Date()).getTime() / 1000);
  const s = `${apiKey}${apiSecret}${timestamp}`;
  return crypto.createHash('sha256').update(s).digest('hex');
};

module.exports = xSignatureGenerator;

