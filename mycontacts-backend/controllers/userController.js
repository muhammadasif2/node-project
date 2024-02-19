const expressAsyncHandler = require("express-async-handler");
const User = require("../modal/userModal");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }

  // Check if the user exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    // Compare the provided password with the stored password
    const passwordCompare = await bcrypt.compare(password, userExist.password);

    if (passwordCompare) {
      // If email and password match, generate and send the access token
      const accessToken = jwt.sign(
        {
          user: { name: userExist.name, email: userExist.email, id: userExist.id },
        },
        process.env.JSON_WEB_TOKEN_SECRETY,
        { expiresIn: '1m' }
      );
      res.status(200).json({ accessToken });
    } else {
      // If password does not match, send an authentication error response
      res.status(401).json({ message: "Incorrect email or password" });
    }
  } else {
    // If user does not exist, send an authentication error response
    res.status(401).json({ message: "Incorrect email or password" });
  }
});


const userList = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const userUpdate = expressAsyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id);
  if (!users) {
    res.json(400);
  }
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateUser);
});

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, description, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already exist");
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const users = await User.create({
      name,
      email,
      password: hashPassword,
      description,
    });
    console.log("User has been created successfully");
    res.status(201).json(users);
  }
});

const currentUser = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  loginUser,
  registerUser,
  currentUser,
  userList,
  userUpdate,
};
