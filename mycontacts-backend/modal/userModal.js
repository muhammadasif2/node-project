const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
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
  
 
//   createdUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
{
  timestamps:true
},
);
module.exports = mongoose.model("User", userSchema);
