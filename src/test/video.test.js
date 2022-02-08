const app = require('../../app')

let chai = require('chai')
let mocha = require('mocha')
let chaiHTTP = require('chai-http')
let should = chai.should()

chai.use(chaiHTTP)

describe('Videos', () => {

    describe('/GET all videos names', () => {
        it('it should GET all the videos names', (done) => {
            chai.request(app)
                .get('/api/video/all')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })

    describe('/POST new video', () => {
        it('it should return error if no video in body', (done) => {

            chai.request(app)
                .post('/api/video')
                .send(0)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    describe('/GET video by id', () => {
        it('it return video', (done) => {
            const id = 'adad1c50-a868-463e-a761-bca12a5c0a6d.test.mp4'
            chai.request(app)
                .get('/api/video/' + id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

})