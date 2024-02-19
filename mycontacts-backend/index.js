const express = require('express')
const dbConnection = require('./config/dbConnection')
const cors = require('cors');
const errorHandler = require('./middleware/errosHandler')
dbConnection()
const app = express()
const env = require('dotenv').config()
app.use(cors());
const port = process.env.PORT || 5000
app.use(express.json())
app.use('/api/contacts',require('./routes/contactsRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port,()=>{
    console.log('server is runing on', port)

})
