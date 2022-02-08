const fs = require('fs')
const path = require('path')
const uuid = require('uuid').v4

class VideoService {

    async addVideo({files}) {
        try {
            const name = uuid() + '.' + files.video.name
            const writableStream = fs.createWriteStream(path.join(process.cwd(), 'src', 'video', `${name}`))

            writableStream.on('error', error => console.log(error))
            writableStream.write(files.video.data)

            return name
        } catch (error) {
            console.log(error)
        }
    }

    async getVideoById({params: {id}}, res) {
        try {
            const readableStream = fs.createReadStream(path.join(process.cwd(), 'src', 'video', id))
            readableStream.on('error', error => console.log(error))

            res.header("Cross-Origin-Resource-Policy", "cross-origin")
            readableStream.pipe(res)
        } catch (error) {
            console.log(error)
        }

    }

    async getAllVideos() {
        try {
            const names = fs.readdirSync(path.join(process.cwd(), 'src', 'video'))
            return names
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = new VideoService