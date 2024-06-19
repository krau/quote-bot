const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.MONGODB_URI)

connection.on('error', error => {
  console.error(error)
  process.exit(1)
})

module.exports = connection
