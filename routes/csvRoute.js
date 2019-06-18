import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    callback(null, `${file.fileName}-${Date.now()}`)
  },
})
const upload = multer({ storage })

export default (app) => {
  app.post('/upload/csv', async (req, res) => {
    upload(req, res, (err) => {
      console.log(req, ' :rrrr')
      if (err) {
        return res.status(422).json(err)
      }
      return res.json({
        result: [],
      })
    })
  })
}
