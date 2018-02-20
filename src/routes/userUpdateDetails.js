const updateHandler = require('../controllers/userUpdateDetails');

module.exports = [
  {
    method: 'GET',
    path: '/userDetails',
    handler: (request, reply) => {
      const userDetailsPromise = updateHandler.updateHandlerForGet(request.headers.authorization);
      console.log(userDetailsPromise,'&&&&');
      userDetailsPromise.then((userDetails) => { reply(userDetails); });
    },
    config: {
      auth: 'jwt',
    },
  },
  {
    method: 'PUT',
    path: '/userDetails',
    handler: (request, reply) => {
      const responsePromise=updateHandler.updateHandlerForPut(request.headers.authorization,request.payload);
      responsePromise.then((reponse)=>{reply(response)});
    },
    config: {
      auth: 'jwt',
    },
  },
];
