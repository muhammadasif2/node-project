
// get  contacts

const getContacts = (req,res)=>{
    res.status(200).json({message:'get all contacts'})
}
// get contact list

const getContact = (req,res)=>{
    res.status(200).json({message:'get contact'})
}
// create contact list

const createContact = (req,res)=>{
    const {name, email, description} = req.body
if(!name|| !email || !description)
{
    res.status(400)
    throw new Error('all fields are required');
}
    res.status(200).json({message:'create contact'})
}
// update contact list

const updateContact = (req,res)=>{
    res.status(200).json({message:'update contact'})
}
// delete contact list

const deleteContact = (req,res)=>{
    res.status(200).json({message:`delete contact ${req.params.id}`})
}


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact

}