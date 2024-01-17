const expressAsyncHandler = require("express-async-handler");
const userModal = require("../modal/userModal");


const loginUser = async (req, res) => {
  res.json({ message: "login user" });
};

const registerUser = expressAsyncHandler (async (req,res)=>{
    const {name, email, description,password} = req.body
if(!name|| !email || !password)
{
    res.status(400)
    throw new Error('all fields are required');
}
    const contact = await userModal.create({name,email,password,description})
    res.status(201).json(contact)
})

const currentUser = async (req, res)=>{
    res.json({message:"current user"})

};

module.exports = {
  loginUser,
  registerUser,
  currentUser
};
