const express = require('express')
const app = express()
const env = require('dotenv').config()

const port = process.env.PORT || 5000
app.use(express.json())
app.use('/api/contacts',require('./routes/contactsRoutes'))

app.listen(port,()=>{
    console.log('server is runing on', port)

})