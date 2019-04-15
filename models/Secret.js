var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var secretSchema = mongoose.Schema({
  uuid: String,
  reading: Number,
  salt: String,
  hash: String,
  iv: String,
  enc: String,
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: undefined }
})

secretSchema.index({ 'expireAt': 1 }, { expireAfterSeconds: 0 })
var Secret = mongoose.model('Secret', secretSchema)

module.exports = Secret
