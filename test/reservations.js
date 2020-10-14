const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

describe('Postings operations', function() {
    before(function() {
        server.start();
    });

    after(function() {
        server.stop();
    })

    describe('Read postings', function() {

        it('Should respond with array of postings', async function() {
            await chai.request(apiAddress)
                .get('/postings')
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.a('object');
                    expect(response.body).to.have.a.property('postings');
                    expect(response.body.postings).to.be.a('array');
                    expect(response.body.postings[0]).to.be.a('object');
                    expect(response.body.postings[0]).to.have.a.property('id');
                    expect(response.body.postings[0]).to.have.a.property('title');
                    expect(response.body.postings[0]).to.have.a.property('descritpion');
                    expect(response.body.postings[0]).to.have.a.property('category');
                    expect(response.body.postings[0]).to.have.a.property('city');
                    expect(response.body.postings[0]).to.have.a.property('price');
                    expect(response.body.postings[0]).to.have.a.property('postDate');
                    expect(response.body.postings[0]).to.have.a.property('deliveryType');
                    expect(response.body.postings[0]).to.have.a.property('sellerName');
                    expect(response.body.postings[0]).to.have.a.property('sellerEmail');
                })
                .catch(error => {
                    expect.fail(error);
                })
        })
    });

    describe('Add a new posting', function() {
        it('Should add a new posting', async function() {
            await chai.request(apiAddress)
                .post('/postings')
                .send({
                    
                })
        })
    })
})