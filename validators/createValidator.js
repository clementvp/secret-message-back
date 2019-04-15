class CreateValidator {
  checkEncrypted (encrypted) {
    return new Promise(function (resolve, reject) {
      if (typeof (encrypted) === 'undefined') {
        reject(new Error('Missing encrypted body param'))
      } else {
        if (typeof (encrypted) === 'string') {
          if (encrypted.length > 1000) {
            reject(new Error('Encrypted param must be a 1000 under chars string'))
          } else {
            resolve()
          }
        } else {
          reject(new Error('Encrypted param must be a string'))
        }
      }
    })
  }

  checkHash (hash) {
    return new Promise(function (resolve, reject) {
      if (typeof (hash) === 'undefined') {
        reject(new Error('Missing hash body param'))
      } else {
        if (typeof (hash) === 'string') {
          if (hash.length > 60) {
            reject(new Error('Hash param must be a 60 under chars string'))
          } else {
            resolve()
          }
        } else {
          reject(new Error('Hash param must be a string'))
        }
      }
    })
  }

  checkSalt (salt) {
    return new Promise(function (resolve, reject) {
      if (typeof (salt) === 'undefined') {
        reject(new Error('Missing salt body param'))
      } else {
        if (typeof (salt) === 'string') {
          if (salt.length > 512) {
            reject(new Error('Hash param must be a 512 under chars string'))
          } else {
            resolve()
          }
        } else {
          reject(new Error('Hash param must be a string'))
        }
      }
    })
  }

  checkIv (iv) {
    return new Promise(function (resolve, reject) {
      if (typeof (iv) === 'undefined') {
        reject(new Error('Missing iv body param'))
      } else {
        if (typeof (iv) === 'string') {
          if (iv.length > 32) {
            reject(new Error('Iv param must be a 32 under chars string'))
          } else {
            resolve()
          }
        } else {
          reject(new Error('Iv param must be a string'))
        }
      }
    })
  }

  checkTtl (ttl) {
    return new Promise(function (resolve, reject) {
      if (typeof (ttl) === 'undefined') {
        reject(new Error('Missing ttl body param'))
      } else {
        if (typeof (ttl) === 'number') {
          ttl = Math.floor(ttl)
          if (ttl > 0 && ttl < 25) {
            resolve()
          } else {
            reject(new Error('Time to live must be between 1 and 24'))
          }
        } else {
          reject(new Error('Ttl param must be a number'))
        }
      }
    })
  }

  checkRn (rn) {
    return new Promise(function (resolve, reject) {
      if (typeof (rn) === 'undefined') {
        reject(new Error('Missing rn body param'))
      } else {
        if (typeof (rn) === 'number') {
          rn = Math.floor(rn)
          if (rn > 0 && rn < 11) {
            resolve()
          } else {
            reject(new Error('Reading number must be between 1 and 10'))
          }
        } else {
          reject(new Error('Rn param must be a number'))
        }
      }
    })
  }
}
module.exports = new CreateValidator()
