const mongoose = require('mongoose');
require('dotenv').config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async () => {
    try{
        await mongoose.connect(mongoUri)
        console.log('MongoDb Database Connected')
    }
     catch(error){
        console.log('Mongodb Database not connected' , error.message)
     }
}
module.exports = {initializeDatabase}


