import fs from 'fs'
import multer from 'multer'
import mongoose from 'mongoose'

const dir = './upload'
const Csv = mongoose.model('csv')

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, dir)
  },
  filename(req, file, callback) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    callback(null, `${file.fieldname}-${Date.now()}`)
  },
})
const upload = multer({ storage }).single('fileUpload')

export default (app) => {
  app.get('/api/csv/:id', async (req, res) => {
    const csv = await Csv.findOne({ _id: req.params.id })

    try {
      res.json({ result: csv })
    } catch (err) {
      res.status(422).json(err)
    }
  })

  app.get('/api/csv-list', async (req, res) => {
    const csvList = await Csv.find().sort({ created: 'desc' })

    try {
      res.json({ result: csvList })
    } catch (err) {
      res.status(422).json(err)
    }
  })

  app.post('/upload/csv', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(422).json(err)
      }

      const csv = new Csv({
        fileName: req.body.fileName,
        location: req.file.fileName,
      })

      try {
        await csv.save()
        const csvList = await Csv.find().sort({ created: 'desc' })
        res.json({ result: csvList })
      } catch (err2) {
        res.status(422).json(err2)
      }
    })
  })
}
