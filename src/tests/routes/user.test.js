process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'ImSuperSecret';

const { describe } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jwt-simple');

const api = require('../../routes/routes');
const { User } = require('../../db/models');

chai.use(chaiHttp);
chai.should();

describe('Users controller', () => {
  let adminUser;
  let testUser;
  let adminToken;
  let userToken;

  before(async () => {
    adminUser = await User.findOne({
      where: { username: 'admin' },
    });
    testUser = await User.findOne({
      where: { username: 'test' },
    });
    adminToken = jwt.encode(
      { sub: adminUser.id, role: adminUser.role },
      process.env.JWT_SECRET
    );
    userToken = jwt.encode(
      { sub: testUser.id, role: testUser.role },
      process.env.JWT_SECRET
    );
  });

  describe('Get all users', () => {
    it('Should return a status 403 if no token provided', async () => {
      const response = await chai.request(api).get(`/api/v1/users`);
      response.should.have.status(403);
    });

    it('Should return a status 403 if a user token is provided', async () => {
      const response = await chai
        .request(api)
        .get(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`);
      response.should.have.status(403);
    });

    it('Should return a status 200 and an array if an admin token is provided', async () => {
      const response = await chai
        .request(api)
        .get(`/api/v1/users`)
        .set('Authorization', `Bearer ${adminToken}`);
      response.should.have.status(200);
    });
  });

  describe('Create a user', () => {
    before(async () => {
      // Remove test user before tests
      await User.destroy({
        where: {
          username: 'test2',
        },
      });
    });

    it('Should return a status 400 if the JSON schema is not valid', async () => {
      const invalidUser = { login: 'test2', password: 'test' };
      const response = await chai
        .request(api)
        .post(`/api/v1/users`)
        .send(invalidUser);
      response.should.have.status(400);
    });

    it('Should return a status 201 if the JSON schema is valid', async () => {
      const newUser = { username: 'test2', hash: 'imsupersecret' };
      const response = await chai
        .request(api)
        .post(`/api/v1/users`)
        .send(newUser);
      response.should.have.status(201);
    });

    it('Should return a status 409 if the username is already taken by another user', async () => {
      const newUser = { username: 'test2', hash: '12345678' };
      const response = await chai
        .request(api)
        .post(`/api/v1/users`)
        .send(newUser);
      response.should.have.status(409);
    });
  });

  describe('Get single user by id', () => {
    it('Should return a status 403 if no token provided', async () => {
      const response = await chai
        .request(api)
        .get(`/api/v1/users/${testUser.id}`);
      response.should.have.status(403);
    });

    it('Should return a status 403 if the user to get is not the one who provide the token', async () => {
      const testUser2 = await User.findOne({ where: { username: 'test2' } });
      const response = await chai
        .request(api)
        .get(`/api/v1/users/${testUser2.id}`)
        .set('Authorization', `Bearer ${userToken}`);
      response.should.have.status(403);
    });

    it('Should return a status 200 and the user if user exist', async () => {
      const response = await chai
        .request(api)
        .get(`/api/v1/users/${testUser.id}`)
        .set('Authorization', `Bearer ${userToken}`);
      response.should.have.status(200);
      response.body.id.should.equal(testUser.id);
    });

    it('Should return a status 404 if user does not exist', async () => {
      const nonExistingId = 'e02593fd-8f04-4bd7-915c-fc0e5b034a4a';
      // eslint-disable-next-line no-unused-expressions
      chai.expect(await User.findOne({ where: { id: nonExistingId } })).to.be
        .null;
      const response = await chai
        .request(api)
        .get(`/api/v1/users/${nonExistingId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      response.should.have.status(404);
    });
  });
});
