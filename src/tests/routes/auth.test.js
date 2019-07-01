process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'ImSuperSecret';

const { describe } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const api = require('../../routes/routes');

chai.use(chaiHttp);
chai.should();

describe('Auth controller', () => {
  describe('Login', () => {
    it('Should return a status 400 if no username or password in body', async () => {
      const response = await chai
        .request(api)
        .post(`/api/v1/login`)
        .send({});
      response.should.have.status(400);
    });
    it('Should return a status 401 if username and password missmatch', async () => {
      const response = await chai
        .request(api)
        .post(`/api/v1/login`)
        .send({
          username: 'test',
          password: 'wrongpassword1234@!',
        });
      response.should.have.status(401);
    });
    it('Should return a status 201 and a token if authentication is a success', async () => {
      const response = await chai
        .request(api)
        .post(`/api/v1/login`)
        .send({
          username: 'test',
          password: 'test1234',
        });
      response.should.have.status(201);
      response.text.should.to.exist;
    });
  });
});
