const {videoService} = require('../../services')
const ErrorHandler = require('../../Errors/ErrorHandler')

class VideoController {
  async addVideo(req, res, next) {
    try {
      const id = await videoService.addVideo(req)
      res.json(id)
    } catch (error) {
      next(new ErrorHandler(error.message, 400))
    }
  }

  async getVideoById(req, res, next) {
    try {
      await videoService.getVideoById(req, res)
    } catch (error) {
      next(new ErrorHandler(error.message, 400))
    }
  }

  async getAllVideos(req, res, next) {
    try {
      const videosName = await videoService.getAllVideos()
      res.json(videosName)
    } catch (error) {
      next(new ErrorHandler(error.message, 400))
    }
  }

}

module.exports = new VideoController