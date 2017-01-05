/**
 * Created by matt on 04/01/17.
 * based on https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
 */
var mongoose = require("mongoose");
var models = require('../models/models');
var relationship = models.relationshipModel;

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('relationships', () => {
    describe('GET', () => {
        it('get all relationships', (done) => {
            chai.request(server)
                .get('/api/relationship')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});