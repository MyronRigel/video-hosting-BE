const {Router} = require('express')
const {videoController} = require('../../controllers')
const {videoMiddleware} = require('../../middlewares')

const videoRouter = Router()

videoRouter.post('/', videoMiddleware, videoController.addVideo)
videoRouter.get('/all', videoController.getAllVideos)
videoRouter.get('/:id', videoController.getVideoById)

module.exports = videoRouter