const mongoose = require('mongoose')

const connectDb = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Connected: ${conn.connection.port}`)
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
} 
 
module.exports=connectDb