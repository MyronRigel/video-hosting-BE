const express = require('express')
const {urlencoded, json} = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const router = require('./src/routes')
const fileUploader = require('express-fileupload')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT
const app = express()

app.use(urlencoded({extended: true}))
app.use(json())

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(fileUploader({}))

app.use('/api', router)

app.listen(PORT, err => err ? console.log(err) : console.log(`server listen port ${PORT}`))


app.use('*', (err, req, res ,next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

process.on('unhandledRejection', reason => {
    console.log(reason)
    process.exit(0)
})

// for testing
module.exports = app