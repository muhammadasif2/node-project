const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({
  title: {
    type: String,
    require: [true,"Please add contact name"],
  },
  email: {
    type: String,
    require:  [true,"Please add contact email"],
  },
  password: {
    type: String,
    require:  [true,"Please add contact password"],
  },
  description: {
    type: String,
    require:  [true,"Please add contact desciption"],
  },
 
//   createdUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
{
  timestamps:true
},
);
module.exports = mongoose.model("Contact", contactSchema);
