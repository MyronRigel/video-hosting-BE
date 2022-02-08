const {Router} = require('express')
const {videoRouter} = require('./allRouters')

const router = Router()

router.use('/video', videoRouter)

module.exports = router