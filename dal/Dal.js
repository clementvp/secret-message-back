const Secret = require('../models/Secret')
const moment = require('moment')
class Dal {
  pushDb (encrypted, hash, salt, iv, ttl, rn) {
    return new Promise(function (resolve, reject) {
      var secret = new Secret({ enc: encrypted, hash: hash, iv: iv, salt: salt, reading: rn, expireAt: moment().add(ttl, 'h') })
      secret.save().then((secret) => {
        resolve(secret._id)
      }).catch(() => {
        reject(new Error('An error occured during saving informations'))
      })
    })
  }
  retrieveDb (uid) {
    return new Promise(function (resolve, reject) {
      Secret.findById(uid).then((secret) => {
        if (secret) {
          const data = secret
          let reading = secret.reading
          reading = reading - 1
          if (reading === 0) {
            Secret.remove({_id: uid}).then(() => {
              resolve(data)
            }).catch(() => {
              reject(new Error('An error occured during retrieve operation'))
            })
          } else {
            secret.reading = reading
            secret.save().then(() => {
              resolve(data)
            }).catch(() => {
              reject(new Error('An error occured during retrieve operation'))
            })
          }
        } else {
          reject(new Error('No secret with this id'))
        }
      }).catch(() => {
        reject(new Error('An error occured during retrieve operation'))
      })
    })
  }
}
module.exports = new Dal()
