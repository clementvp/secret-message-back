class RetrieveValidator {
  checkUid (uid) {
    return new Promise(function (resolve, reject) {
      if (typeof (uid) === 'undefined') {
        reject(new Error('Missing uid param'))
      } else {
        resolve()
      }
    })
  }
}
module.exports = new RetrieveValidator()
