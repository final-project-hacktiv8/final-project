const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const ModelUser = require('../models/mUser');
const expect = chai.expect

describe('User Test', function(){
    let user = {
        fullname :'userTesting',
        password :'testingpassword',
        email :'testing@gmail.com'
    }

    let beforeChange = {
        token: ''
    };

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODU3NzlmOTRjZDQ2MjM1MDQ4N2M1YSIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE1NjkwMjc5OTl9.27crGKRsB11SBlX2juEviP02YVRq9dG7w5lZ37rfH74';
    
    let image = require('../imagetest')

    after(function () {
        return ModelUser.deleteMany()
    })

    describe('Test Route /user/signup', function(){
        it('Success signup with status code 200', function(done){
            chai.request(app)
                .post('/user/signup')
                .send(user)
                .end(function(err,res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.an('Object');
                    expect(res.body.data).to.have.property('email');
                    expect(res.body.data).to.have.property('password');
                    expect(res.body.data).to.have.property('fullname');
                    expect(res.body.data).to.have.property('photo_path');
                    expect(res.body.data.password).to.not.equal(user.password);
                    expect(res.body.data.email).equal(user.email);
                    expect(res.body.data.fullname).equal(user.fullname)
                    done()
                })
        })

        it('Failed Register when missing 1 attribute', function(done){
            chai.request(app)
                .post('/user/signup')
                .send({
                    fullname : user.fullname,
                    password : user.password,
                })
                .end(function(err,res){
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body.message).to.include('Please');
                    done();
                })
        })

        it('Failed when email already used', function(done){
            chai.request(app)
                .post('/user/signup')
                .send(user)
                .end(function(err,res){
                    expect(res).to.have.status(409)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body.message).to.includes('already used')
                    done()
                })
        })

        it('Failed when email not valid', function(done){
            chai.request(app)
                .post('/user/signup')
                .send({
                    fullname : user.fullname,
                    email : 'fasdas3123',
                    password : user.password
                })
                .end(function(err,res){
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body.message).to.includes('valid email address')
                    done()
                })
        })
        


    })


    describe('Test route /user/signin', function(){
        it('Successfully login with status code 200', function(done){
            chai.request(app)
                .post('/user/signin')
                .send({
                    email: user.email,
                    password : user.password
                })
                .end(function(err,res){
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('Object')
                    expect(res.body.data).to.have.property('email')
                    expect(res.body.data).to.have.property('password')
                    expect(res.body.data).to.have.property('photo_path')
                    expect(res.body.data).to.have.property('_id')
                    expect(res.body.data).to.have.property('fullname')
                    beforeChange = {token: res.body.token, data: res.body.data}
                    done()
                })
        })

        it('Failed Login when password not match', function(done){
            chai.request(app)
                .post('/user/signin')
                .send({
                    email: user.email,
                    password: "iningasal"
                })
                .end(function(err,res){
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body.message).to.include('not found');
                    done()
                })
        })
        
        it('Failed Login when email not found', function(done){
            chai.request(app)
                .post('/user/signin')
                .send({
                    email: "1bs2@gmail.com",
                    password: "iningasal"
                })
                .end(function(err,res){
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body.message).to.include('not found');
                    done()
                })
        })
        
    })    

    describe('Test routes /user/changephoto', function(){
        it('successfully change photo', function(done){
            chai.request(app)
                .post('/user/changephoto')
                .set('token', beforeChange.token)
                .send({
                    photo : image
                })
                .end(function(err,res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('Object');
                    expect(res.body.photo_path).to.not.equal(beforeChange.data.photo_path)
                    expect(res.body.fullname).to.equal(beforeChange.data.fullname)
                    expect(res.body.email).to.equal(beforeChange.data.email)
                    expect(res.body.password).to.equal(beforeChange.data.password)                    
                    done()
                })
        })

        it('Denied when token is not valid', function(done){
            chai.request(app)
                .post('/user/changephoto')
                .set('token', '123123123123123')
                .send({
                    photo: image
                })
                .end(function(err,res){
                    expect(res).to.have.status(401);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body.message).includes(`Token isn't valid`)
                    done();
                })
        })

        it('denied when type file is not image in base64', function(done){
            chai.request(app)
                .post('/user/changephoto')
                .send({
                    photo: image.slice(40)
                })
                .set('token', beforeChange.token)
                .end(function(err,res){
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).includes('must be encoded')
                    done()
                })
        })

        it('denied when type file is not image', function(done){
            chai.request(app)
                .post('/user/changephoto')
                .set('token', beforeChange.token)
                .send({
                    photo: "data:application/pdf;base64,"+image.slice(23)
                })
                .end(function(err,res){
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('Object');
                    expect(res.body).to.have.property('statusCode');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.includes('Only')
                    done()
                })
        })

    })
})
