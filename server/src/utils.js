const crypto = require('node:crypto')

exports.md5 = function (str = '') {
  const hash = crypto.createHash('md5')
  return hash.update(str).digest('hex')
}
