import mongoose, { Schema } from 'mongoose'

const csvSchema = new Schema({
  fileName: {
    type: String,
    trim: true,
  },
  saveName: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
})

csvSchema.index(
  {
    firstName: 1,
    saveName: 1,
    created: 1,
  }, {
    name: 'csvFieldIndex',
  },
)

mongoose.model('csv', csvSchema)
