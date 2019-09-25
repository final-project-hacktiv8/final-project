const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const ModelToken = require('../models/mToken');
const expect = chai.expect

describe('Test push notification', function(){
    let newData = {
        fullname: 'Fucntion',
        expo_token: 'ExponentPushToken[yDhvaAN-A4R14TVZ9gqHX7]',
    }

    after(function(){
       return ModelToken.deleteMany({})
    })

    describe('Test route /token/add', function(){
        it ('Successfully add new token ', function(done){
            chai.request(app)
                .post('/token/add')
                .send(newData)
                .end(function(err,res){
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('fullname')
                    expect(res.body).to.have.property('expo_token')
                    expect(res.body.fullname).to.equal(newData.fullname)
                    expect(res.body.expo_token).to.equal(newData.expo_token)
                    done()
                })
        })

        it('Error when missing 1 attribute', function(done){
            chai.request(app)
                .post('/token/add')
                .send({
                    fullname: 'abcdefgh'
                })
                .end(function(err,res){
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include('Please')
                    done()
                })
        })
    })

    describe('Test route /token/sendnotif', function(){
        it('succesfully broadcast push notification', function(done){
            chai.request(app)
                .post('/token/send')
                .send({
                    title : 'Ini testing',
                    body : 'Dari testing js',
                })
                .end(function(err,res){
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.includes('Ok')
                    done()
                })
        })

        it('error when missing 1 attribute', function(done){
            chai.request(app)
                .post('/token/send')
                .send({
                    title : 'Failed Testing'
                })
                .end(function(err,res){
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body.message).to.include('title/body cant null')
                    done()
                })
        })
       
    })

})