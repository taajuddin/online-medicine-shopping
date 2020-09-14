const mongoose = require('mongoose')

mongoose.Promise=global.Promise
const CONNECTION_URI=process.env.MONGODB_URI ||'mongodb://localhost:27017/e-commerce'

const configureDB = () => {
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = configureDB