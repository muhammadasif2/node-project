const express = require('express')
const dbConnection = require('./config/dbConnection')
<<<<<<< HEAD

=======
const cors = require('cors');
>>>>>>> dbfb1899e4bc34d8a50fd27ecf7afa748fe934cf
const errorHandler = require('./middleware/errosHandler')
dbConnection()
const app = express()
const env = require('dotenv').config()
<<<<<<< HEAD

=======
app.use(cors());
>>>>>>> dbfb1899e4bc34d8a50fd27ecf7afa748fe934cf
const port = process.env.PORT || 5000
app.use(express.json())
app.use('/api/contacts',require('./routes/contactsRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
<<<<<<< HEAD
app.use(errorHandler)
=======
// app.use(errorHandler)
>>>>>>> dbfb1899e4bc34d8a50fd27ecf7afa748fe934cf

app.listen(port,()=>{
    console.log('server is runing on', port)

})
