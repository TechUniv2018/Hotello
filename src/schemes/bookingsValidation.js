const Joi = require('joi');

module.exports = Joi.object({
  rooms: Joi.array().items(Joi.object({
    rateKey: Joi.string().required().example('20180315|20180316|W|1|161032|STU.ST|REP-TODOS|SC||1~2~0||N@002642FC0BA643609D447AF680C1DFB70133'),
    paxes: Joi.array().items(Joi.object({
      roomId: Joi.string().required().example('1'),
      type: Joi.string().required().example('AD'),
      name: Joi.string().required().example('Gaurav'),
      surname: Joi.string().optional().example('Sharma'),
    })),
  })),
});
