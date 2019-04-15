require('dotenv').config()
var expect = require('chai').expect
var app = require('../app')
const request = require('supertest')
const sinon = require('sinon')
const dal = require('../dal/Dal')

describe('Secret Post Test', () => {
  it('test should pass, because everithing is ok', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 4,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.false
        stub.restore()
        done(err)
      })
  })

  it('test should pass, because returned uid is fine', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 4,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.uid).to.be.equal('1234567890')
        expect(res.body.errors).to.be.false
        stub.restore()
        done(err)
      })
  })

  it('test should failed, because missing hash', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 4,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.true
        expect(res.body.msg).to.be.equal('Missing hash body param')
        stub.restore()
        done(err)
      })
  })

  it('test should failed, because missing iv', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 4,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.true
        expect(res.body.msg).to.be.equal('Missing iv body param')
        stub.restore()
        done(err)
      })
  })

  it('test should failed, because missing salt', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        encrypted: '021568643515335',
        ttl: 4,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.true
        expect(res.body.msg).to.be.equal('Missing salt body param')
        stub.restore()
        done(err)
      })
  })

  it('test should failed, because missing encrypted', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        ttl: 4,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.true
        expect(res.body.msg).to.be.equal('Missing encrypted body param')
        stub.restore()
        done(err)
      })
  })

  it('test should failed, because missing ttl', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.true
        expect(res.body.msg).to.be.equal('Missing ttl body param')
        stub.restore()
        done(err)
      })
  })

  it('test should failed, because missing rn', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.errors).to.be.true
        expect(res.body.msg).to.be.equal('Missing rn body param')
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because ttl is out of range', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: -1,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('Time to live must be between 1 and 24')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because ttl is out of range', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 25,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('Time to live must be between 1 and 24')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because ttl is a string', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 'test',
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('Ttl param must be a number')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because rn is out of range', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 1,
        rn: -1
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('Reading number must be between 1 and 10')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because rn is out of range', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 1,
        rn: 11
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('Reading number must be between 1 and 10')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because rn is a string', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.resolves('1234567890')
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 1,
        rn: 'test'
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('Rn param must be a number')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })

  it('test should fail, because pushDb fail', (done) => {
    const stub = sinon.stub(dal, 'pushDb')
    stub.rejects(new Error('An error occured during saving informations'))
    request(app).post('/secret')
      .send({
        hash: 'clement',
        iv: 'VIPI',
        salt: 'plop@gmail.com',
        encrypted: '021568643515335',
        ttl: 1,
        rn: 4
      })
      .expect(200).end((err, res) => {
        expect(res.body.msg).to.be.equal('An error occured during saving informations')
        expect(res.body.errors).to.be.true
        stub.restore()
        done(err)
      })
  })
})
