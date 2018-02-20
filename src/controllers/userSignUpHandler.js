const Models = require('../../models');

const handler = (request, reply) => {
  const {
    firstName, lastName, password, email, role,
  } = request.payload;
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
      reply({ userDetails: { firstName, lastName, email }, msg: 'User Signed Up!' }).code(201);
    })
    .catch(() => {
      reply('This email belongs to an existing user.').code(409);
    });
};

module.exports = handler;
