const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
  title: {
    type: String,
    required: false,
    default: ''
  },
  isDone: {
    type: Boolean,
    required: false,
    default: false
  },
})

TodoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = model('Todo', TodoSchema)