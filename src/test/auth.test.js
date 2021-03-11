import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const signupUrl = '/api/v1/user';
const loginUrl = '/api/v1/user/login';

describe('Auth Test', () => {
  describe('Account Creation', () => {
    it('A user should be able to sign up ', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          firstName: 'Gaines',
          lastName: 'God',
          email: 'stepheng323@gmail.com', // valid signup details
          password: 'olaTUNDELA2345',
          phone: '+2348162511023',
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('email');
          expect(res.body.payload).to.have.property('token');
          expect(res.body.payload).to.have.property('role');
          done();
        });
    });

    it('it should throw error if email already exist', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          firstName: 'Gaines',
          lastName: 'God',
          email: 'johndoe@gmail.com', // existing email via seed
          password: 'olaTUNDELA2345',
          phone: '+2348162511023',
        })
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('a user with the email exist');
          done();
        });
    });

    it('it should throw error if user does not supply email', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          firstName: 'Gaines',
          lastName: 'God',
          password: 'olaTUNDELA2345',
          phone: '+2348162511023',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('email is required');
          done();
        });
    });

    it('it should throw error if user does not supply firstname', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          email: 'stepheng323@gmail.com',
          password: 'olaTundela234',
          lastName: 'oyebanji',
          phone: '0802344455',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('firstName is required');
          done();
        });
    });
    it('it should throw error if user does not supply lastname', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          email: 'stepheng323@gmail.com',
          password: 'olaTundela234',
          firstName: 'stephen',
          phone: '0802344455',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('lastName is required');
          done();
        });
    });
  });
  describe('LOGIN', () => {
    it('User should be able to login with valid credentials', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send({
          email: 'stepheng323@gmail.com', // valid login details
          password: 'olaTUNDELA2345',
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('email');
          expect(res.body.payload).to.have.property('token');
          expect(res.body.payload).to.have.property('role');
          expect(res).to.have.cookie('refreshToken');
          done();
        });
    });
    it('it should throw error, if user tries to login with incorrect email', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send({
          email: 'stepheng32@gmail.com', // wrong email details
          password: 'olaTUNDELA2345',
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('incorrect email or password combination');
          done();
        });
    });
    it('it should throw error, if user tries to login with incorrect password', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send({
          email: 'stepheng323@gmail.com',
          password: 'wrongpassword', // wrong password
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('incorrect email or password combination');
          done();
        });
    });
  });
});
