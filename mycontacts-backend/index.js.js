const express = require('express')
const app = express()
const env = require('dotenv').config()

const port = process.env.PORT || 5000
app.get('/api/contacts',(req,res)=>{
    res.send('get all contacts')
})

app.listen(port,()=>{
    console.log('server is runing on', port)

})