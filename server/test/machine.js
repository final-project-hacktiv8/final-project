const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const ModelUser = require('../models/mUser');
const ModelRasp = require('../models/mRasp');
const expect = chai.expect


describe('Route Machine Test', function(){
    let token = '';
    let fakeToken = '';
    let user = {
        fullname :'userTesting',
        password :'testingpassword',
        email :'testing@gmail.com'
    };

    let fakeUser = {
        fullname : 'fakeUserTesting',
        password: 'fakeuser',
        email: 'fakeuser@gmail.com'
    }
    let machineId = '';

    before(function(done){
            chai.request(app)
                .post('/user/signup')
                .send(user)
                .end(function(err,res){
                    token = res.body.token
                    done()
                })
        })

    before(function(done){
        chai.request(app)
            .post('/user/signup')
            .send(fakeUser)
            .end(function(err,res){
                fakeToken = res.body.token
                done()
            })
    })

    after(function(done){
        ModelRasp.deleteMany()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    after(function(done){
        ModelUser.deleteMany()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    describe('test route /machine/add', function(){
        it('fail authorization with status code 401', function(done){
            chai.request(app)
                .post('/machine/add')
                .send({
                    machineId: 'asdas123'
                })
                .set('token', "1231231231231")
                .end(function(err,res){
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.includes("Token isn't valid");
                    done()
                })
        })

        it('fail when missing 1 atrribute with status code 400', function(done){
            chai.request(app)
                .post('/machine/add')
                .set('token',fakeToken)
                .end(function(err,res){
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    done()
                })
        })

        it('successfuly add new machine ', function(done){
            chai.request(app)
                .post('/machine/add')
                .send({
                    machineId: 'asdas123'
                })
                .set('token', token)
                .end(function(err,res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('owner');
                    expect(res.body).to.have.property('machineId');
                    machineId = res.body._id;
                    done()
                })
        })
    })

    describe('test route /machine/get', function(){
        it('succesfully get data with status code 200', function(done){
            chai.request(app)
                .get('/machine/')
                .set('token', token)
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an('Array');
                    done()
                })
        })

        it('failed user not authorized with status code 401', function(done){
            chai.request(app)
                .get('/machine/')
                .set('token', "1231321312")
                .end(function(err,res){
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.include('Token')
                    done()
                })
        })
    })

    describe('test route /machine/delete', function(){
        it('failed delete when invalid token with status code 401', function(done){
            chai.request(app)
                .delete(`/machine/delete/${machineId}`)
                .set('token', "12312312")
                .end(function(err,res){
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).includes('Token')
                    done()
                })
        })

        it('failed delete when owner id doesnt match with status code 401', function(done){
            chai.request(app)
                .delete(`/machine/delete/${machineId}`)
                .set('token', fakeToken)
                .end(function(err,res){
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).includes('action fail')
                    done()
                })
                
        })

        it('successfully delete with status code 200', function(done){
            chai.request(app)
                .delete(`/machine/delete/${machineId}`)
                .set('token', token)
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).include('Success');
                    done()
                })
        })

    })

})