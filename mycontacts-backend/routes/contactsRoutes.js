const express = require('express')
const router = express.Router()
const  {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController')
// get list of contacts
router.route('/').get(getContacts).post(createContact)
router.route('/:id').delete(deleteContact).get(getContact).put(updateContact)


module.exports = router