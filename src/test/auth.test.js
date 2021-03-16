import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/user';
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
          email: 'sgagnonpie@gmail.com', // valid signup details
          password: 'olatundela234',
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
          password: 'olatundela234',
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
          password: 'olatundela234',
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
          password: 'olatundela234',
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
          password: 'olatundela234',
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
          email: 'nonexistent@gmail.com', // wrong email details
          password: 'olatundela234',
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(
            'incorrect email or password combination'
          );
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
          expect(res.body.message).to.equal(
            'incorrect email or password combination'
          );
          done();
        });
    });
  });
  describe('REQUEST PASSWORD RESET', () => {
    // it('Should return success if user email is found in the system', (done) => {
    //   chai
    //     .request(app)
    //     .post(`${baseUrl}/forgot-password`)
    //     .send({ email: 'johndoe@gmail.com' }) // valid email
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.have.property('success');
    //       expect(res.body).to.have.property('message');
    //       expect(res.body.success).to.equal(true);
    //       done();
    //     });
    // });
    it('Should return success if user email is not found in the system', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/forgot-password`)
        .send({ email: 'emailnotexist@gmail.com' }) // no such email in the system
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
  describe('RESET FORGOT PASSWORD', () => {
    it('Should throw error if no reset token is supplied', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/reset-forgot-password?resetToken`)
        .send({ password: 'olaTundela234' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });
    it('Should throw error if expired reset token is supplied', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/reset-forgot-password?resetToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZXBoZW5nMzIzQGdtYWlsLmNvbSIsImlhdCI6MTYxNTczODYxMSwiZXhwIjoxNjE1NzQyMjExfQ.MAMojH6veGkL8z1157p9ZsA0iaSTuD_taa0zA3gmw6k`)
        .send({ password: 'olaTundela234' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('jwt expired');
          done();
        });
    });
  });
});
