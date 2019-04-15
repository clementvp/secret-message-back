const createValidator = require('../validators/createValidator')
const retrieveValidator = require('../validators/retrieveValidator')
const dal = require('../dal/Dal')
class UserCtrl {
  async create (req, res, next) {
    const encrypted = req.body.encrypted
    const iv = req.body.iv
    const salt = req.body.salt
    const ttl = req.body.ttl
    const rn = req.body.rn
    const hash = req.body.hash
    try {
      await createValidator.checkEncrypted(encrypted)
      await createValidator.checkHash(hash)
      await createValidator.checkSalt(salt)
      await createValidator.checkIv(iv)
      await createValidator.checkTtl(ttl)
      await createValidator.checkRn(rn)
      const uid = await dal.pushDb(encrypted, hash, salt, iv, ttl, rn)
      res.json({ errors: false, uid: uid })
    } catch (error) {
      res.json({errors: true, msg: error.message})
    }
  }

  async retrieve (req, res, next) {
    const uid = req.params.uid
    try {
      await retrieveValidator.checkUid(uid)
      let data = await dal.retrieveDb(uid)
      data = {encrypted: data.enc, iv: data.iv, salt: data.salt, hash: data.hash}
      res.json({errors: false, data: data})
    } catch (error) {
      res.json({errors: true, msg: error.message})
    }
  }
}
module.exports = new UserCtrl()
