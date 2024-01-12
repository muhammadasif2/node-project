const mongoose = require('mongoose')
const dbConnection = async () => {
    try{
        const connect = await mongoose.connect(`mongodb+srv://asif:asif@cluster0.y2lwxgj.mongodb.net/mycontacts-backend?retryWrites=true&w=majority`)
        console.log("db connected ", connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = dbConnection