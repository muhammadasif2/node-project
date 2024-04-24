const express = require('express')
const router = express.Router()
const  {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController')
// const validateToken = require('../middleware/validateTokenHandler')
// get list of contacts
// make contact private the we use 
// router.use(validateToken)
router.route('/').get(getContacts).post(createContact)
router.route('/:id').delete(deleteContact).get(getContact).put(updateContact)


module.exports = router