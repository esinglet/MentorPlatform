/**
 * Created by matt on 04/01/17.
 * based on https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('basic gets', () => {
    describe('GET', () => {
        it('get the login page', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('get survey1', (done) => {
            chai.request(server)
                .get('/survey1')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});