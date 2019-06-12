const { describe } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../../routes/routes');
const { User } = require('../../db/models');

chai.use(chaiHttp);
chai.should();

describe('Users controller', () => {
  describe('Get all users', () => {
    it('Should return a status 200 and an array', async () => {
      const response = await chai.request(api).get(`/api/v1/users`);
      response.should.have.status(200);
      response.body.should.be.an('array');
    });
  });
  describe('Create a user', () => {
    before(async () => {
      // Remove test user before tests
      await User.destroy({
        where: {
          username: 'test',
        },
      });
    });
    it('Should return a status 400 if the JSON schema is not valid', async () => {
      const invalidUser = { login: 'test', password: 'test' };
      const response = await chai
        .request(api)
        .post(`/api/v1/users`)
        .send(invalidUser);
      response.should.have.status(400);
    });
    it('Should return a status 201 if the JSON schema is valid', async () => {
      const newUser = { username: 'test', hash: 'imsupersecret' };
      const response = await chai
        .request(api)
        .post(`/api/v1/users`)
        .send(newUser);
      response.should.have.status(201);
    });
    it('Should return a status 409 if the username is already taken by another user', async () => {
      const newUser = { username: 'test', hash: '12345678' };
      const response = await chai
        .request(api)
        .post(`/api/v1/users`)
        .send(newUser);
      response.should.have.status(409);
    });
  });
  describe('Get single user by id', () => {
    let user;
    before(async () => {
      user = await User.findOne({ where: { username: 'test2' } });
      // eslint-disable-next-line no-unused-expressions
      chai.expect(user).to.not.be.null;
    });
    it('Should return a status 200 and the user if user exist', async () => {
      const response = await chai.request(api).get(`/api/v1/users/${user.id}`);
      response.should.have.status(200);
      response.body.id.should.equal(user.id);
    });
    it('Should return a status 404 if user does not exist', async () => {
      const nonExistingId = 'e02593fd-8f04-4bd7-915c-fc0e5b034a4a';
      // eslint-disable-next-line no-unused-expressions
      chai.expect(await User.findOne({ where: { id: nonExistingId } })).to.be
        .null;
      const response = await chai
        .request(api)
        .get(`/api/v1/users/${nonExistingId}`);
      response.should.have.status(404);
    });
  });
});
