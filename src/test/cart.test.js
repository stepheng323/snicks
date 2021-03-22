import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/cart';
const loginUrl = '/api/v1/user/login';

const user1 = {
  email: 'johndoe@gmail.com',
  password: 'olatundela234',
};
const user2 = {
  email: 'stepheng323@gmail.com',
  password: 'olatundela234',
};

let user1Token;
let user2Token;

describe('Cart', () => {
  before(async () => {
    await chai.request(app)
      .post(loginUrl)
      .send(user1)
      .then((res) => {
        user1Token = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
    await chai.request(app)
      .post(loginUrl)
      .send(user2)
      .then((res) => {
        user2Token = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
  });
  it('Should be able to add product to cart', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/${1}`)
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.payload).to.have.property('id');
        expect(res.body.payload).to.have.property('userId');
        expect(res.body.payload).to.have.property('productId');
        expect(res.body.payload).to.have.property('quantity');
        done();
      });
  });
  it('Should throw error if productId sent is not found', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/${1000}`)
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should throw error if invalid productId is sent', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/hhhh`)
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should throw error if unauthenticated user tries to add product to cart', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/hhhh`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should list all items in cart of a signed in user', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}`)
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.be.an('array');
        done();
      });
  });
  it('Should throw error for unauthenticated request to view cart items ', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('User should be able to remove his/her product from cart ', (done) => {
    chai
      .request(app)
      .delete(`${baseUrl}/2`)
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('It should throw error if a user tries to access another users cart', (done) => {
    chai
      .request(app)
      .delete(`${baseUrl}/3`)
      .set('Authorization', user2Token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
