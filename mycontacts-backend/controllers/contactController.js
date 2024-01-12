const asyncHandler = require('express-async-handler')
const Contact = require('../modal/contactModal')
// get  contacts

const getContacts = asyncHandler(async(req,res) =>{
    const contact = await Contact.find()
    res.status(200).json(contact)
})
// get contact list

const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(400)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})
// create contact list

const createContact = asyncHandler (async (req,res)=>{
    const {title, email, description,password} = req.body
if(!title|| !email || !description||!password)
{
    res.status(400)
    throw new Error('all fields are required');
}
    const contact = await Contact.create({title,email,password,description})
    res.status(201).json(contact)
})

// update contact list

const updateContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(400)
        throw new Error('record not deleted try again');
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContact)
})
// delete contact list

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
   
    if(!contact)
    {
        res.status(400)
        throw new Error('record not deleted try again');
    }
    await Contact.deleteOne({ _id: req.params.id }); // Specify the condition to identify the contact
    res.status(200).json(contact);
})


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact

}