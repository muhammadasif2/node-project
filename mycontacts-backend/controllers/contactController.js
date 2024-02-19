const asyncHandler = require("express-async-handler");
const Contact = require("../modal/contactModal");
// get  contacts

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({user_id:req.user.id});
  try {
    const responseData = {
      data: contact,
      message: "Contact List",
      status: 200,
    };
    res.status(200).json(responseData);
  } catch (error) {
    // If an error occurs during processing, send an error response
    const errorMessage = "Error processing the request";

    // You can choose an appropriate status code for the error
    res.status(500).json({ error: errorMessage });
  }
});
// get contact list

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
// create contact list

const createContact = asyncHandler(async (req, res) => {
  const { title, email, description, password } = req.body;
  if (!title || !email || !description) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const contact = await Contact.create({ title, email, password, description });
  try {
    const responseData = {
      data: contact,
      message: "Record has been saved successfullay",
      status: 200,
    };
    res.status(201).json(responseData);
  } catch (error) {
    // If an error occurs during processing, send an error response
    const errorMessage = "Error processing the request";

    // You can choose an appropriate status code for the error
    res.status(500).json({ error: errorMessage });
  }
});

// update contact list

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("record not deleted try again");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  try {
    const responseData = {
      data: updateContact,
      message: "Record has been Updated successfullay",
      status: 200,
    };
    res.status(200).json(responseData);
  } catch (error) {
    // If an error occurs during processing, send an error response
    const errorMessage = "Error processing the request";

    // You can choose an appropriate status code for the error
    res.status(500).json({ error: errorMessage });
  }
});
// delete contact list

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("record not deleted try again");
  }
  try {
    await Contact.deleteOne({ _id: req.params.id }); // Specify the condition to identify the contact
    const responseData = {
      data: contact,
      message: "Record has been deleted successfully",
      status: 200,
    };
    res.status(200).json(responseData);
  } catch (error) {
    // If an error occurs during processing, send an error response
    const errorMessage = "Error processing the request";

    // You can choose an appropriate status code for the error
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
