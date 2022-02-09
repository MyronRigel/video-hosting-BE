const fs = require('fs')
const path = require('path')
const uuid = require('uuid').v4
const ErrorHandler = require('../../Errors/ErrorHandler')

class VideoService {

  async addVideo({files}) {
    try {
      const name = `${uuid()}.${files.video.name}`
      const writableStream = fs.createWriteStream(path.join(process.cwd(), 'src', 'video', name))

      writableStream.on('error', error => new ErrorHandler(error.message, 500))
      writableStream.write(files.video.data)

      return name
    } catch (error) {
      return new ErrorHandler('error while writing video on server', 500)
    }
  }

  async getVideoById({params: {id}}, res) {
    try {
      const readableStream = fs.createReadStream(path.join(process.cwd(), 'src', 'video', id))
      readableStream.on('error', error => new ErrorHandler(error.message, 500))

      res.header('Cross-Origin-Resource-Policy', 'cross-origin')
      readableStream.pipe(res)

    } catch (error) {
      return new ErrorHandler(error.message, 500)
    }
  }

  async getAllVideos() {
    try {
      const names = fs.readdirSync(path.join(process.cwd(), 'src', 'video'))

      return names

    } catch (error) {
      return new ErrorHandler(error.message, 500)
    }
  }

}

module.exports = new VideoService