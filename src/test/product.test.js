import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
const baseUrl = '/api/v1/product';

chai.use(chaiHttp);
const loginUrl = '/api/v1/user/login';
let adminToken;
let userToken;

const user = {
  email: 'sgagnonpie@gmail.com',
  password: 'olatundela234'
};
const admin = {
  email: 'stepheng323@gmail.com',
  password: 'olatundela234'
};

describe('Add Product', () => {
  before(async () => {
    await chai.request(app)
      .post(loginUrl)
      .send(user)
      .then((res) => {
        userToken = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
    await chai.request(app)
      .post(loginUrl)
      .send(admin)
      .then((res) => {
        adminToken = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
  });
  it('should allow admin add get a presign url', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/presignUrl`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body.payload).to.have.property('url');
        expect(res.body.payload).to.have.property('key');
        done();
      });
  });
  it('should throw error if an unauthorised user tries to get presign url', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/presignUrl`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should throw error if an unauthenticated request user tries to get presign url', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/presignUrl`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should allow admin add products to the store', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body.payload).to.have.property('id');
        expect(res.body.payload).to.have.property('userId');
        expect(res.body.payload).to.have.property('brandId');
        expect(res.body.payload).to.have.property('title');
        expect(res.body.payload).to.have.property('description');
        expect(res.body.payload).to.have.property('colors');
        expect(res.body.payload).to.have.property('sizes');
        expect(res.body.payload).to.have.property('specification');
        done();
      });
  });
  it('Throw Error if an unauthorised user tries to add a product', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', userToken)
      .send({
        title: 'Airforce 1',
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if no token is provided', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        title: 'Airforce 1',
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if title is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if description is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if price is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if colors is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        price: 27000,
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if images is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        price: 27000,
        colors: ['white'],
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        specification: ' ',
        brandId: 1,
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if brandId is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        specification: ' ',
        sizes: [41, 42, 43, 45],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Throw Error if sizes is not included', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', adminToken)
      .send({
        title: 'Airforce 1',
        price: 27000,
        colors: ['white'],
        images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
        description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
        specification: ' ',
        brandId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Unauthenticated user should be able to access product listing', (done) => {
    chai
      .request(app)
      .get(baseUrl)
      .query({ page: 1, limit: 1 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Unauthenticated user should be able to access product listing with pagination', (done) => {
    chai
      .request(app)
      .get(baseUrl)
      .query({ page: 1, limit: 4 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body.payload.next).to.be.an('object');
        done();
      });
  });
  it('user should be able to access product listing without pagination', (done) => {
    chai
      .request(app)
      .get(baseUrl)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body.payload.next).to.be.a('undefined');

        done();
      });
  });
});
