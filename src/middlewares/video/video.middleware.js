const ErrorHandler = require('../../Errors/ErrorHandler')
const {mimeTypes} = require('../../enums')

const videoMiddleware = (req, res, next) => {

  if (!req.files || !req.files.video) {
    return next(new ErrorHandler('no video', 400))
  }
  const {video} = req.files

  if (!mimeTypes.includes(video.mimetype)) {
    return next(new ErrorHandler('wrong mimetype', 400))
  }

  next()
}

module.exports = videoMiddleware