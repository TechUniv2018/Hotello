const Models = require('../../models');
const crypto = require('crypto');

const handler = (request, reply) => {
  const password = crypto.createHash('md5').update(request.payload.password).digest('hex');
  const { firstName, lastName, email } = request.payload;
  const role = 'publicUser';
  const phoneNumber = Number(request.payload.phoneNumber);
  const userInsertedPromise = Models.users.create({
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    role,
  });
  userInsertedPromise
    .then(() => {
      reply({
        userDetails: {
          firstName, lastName, email, phoneNumber, password: request.payload.password,
        },
        msg: 'User Signed Up!',
      }).code(201);
    })
    .catch(() => {
      reply('This email belongs to an existing user.').code(409);
    });
};

module.exports = handler;
