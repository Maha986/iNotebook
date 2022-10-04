const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const { body, validationResult } =   require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const route = express.Router();

//create a user using: POST "/api/auth/createUser". NO login required
route.post('/createuser', [
  
  //another way to write the custom msg is
  //body('email','enter a valid email').isEmail()
  body('email').isEmail().withMessage('Provide a valid Email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 chars long'),
  body('name').isLength({ min: 3 }).withMessage('Name must be atleast 3 chars long'),
], //async method to tell that the part where the await keyword is written will be first completed then the next processing will be done, till then the execution will be stopped at that function and next function will not be executed asyncronously  
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:success,message: errors.array() });
    }

    //check whether the user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success:success,message: 'Sorry a user with this email already exists.' });
      }

      //create the salt and hash for secure password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user: { id: user.id }
      }
      const authToken = jwt.sign(data, config.JWT_SECRET);
      success=true;
      // console.log(authToken);
      res.json({success:success,message:authToken})
      // res.json(`User `+req.body.name+` has been created.`)
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
    // .then(user => res.json(user)).catch(() => { res.json({ error: 'Please enter a unique value for email' }) });
  })

//Promises method, in which we use then() to tell that it will execute once the previous function has been successfuly executed

// (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   }).then(user => res.json(user)).catch(() => { res.json({ error: 'Please enter a unique value for email' }) });
// })




//Authenticate a user using: POST "/api/auth/login".
route.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blank').exists()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: 'Please enter valid credentials.' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ errors: "Please enter valid credentials." });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    success = true;
    const authToken = jwt.sign(data, config.JWT_SECRET);
    res.json({success,authToken});
    // }
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});


// Route 3: get loggedin user details
route.post('/getuser', fetchuser, async (req, res) => {
  // console.log(__dirname);
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //-password means select all except password
    res.send(user);
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = route;