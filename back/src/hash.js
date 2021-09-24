const sha256 = require('sha256')

module.exports = function(string = '') {
    if (typeof string !== 'string') {throw 'hash.js provide string for generating hash. or provide nothing for '}

    if (string) {
        return sha256(string + 'rtf4JY4fqVuSDthU5EY6L3LLmcN3sQEqHxy4FkTANZXvFf9g')
    }else {
        return sha256(`${Math.random()}`)
    }
}