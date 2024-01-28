const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Adityaisagoodb$oy';

// Route 1  Create User using: Post "/api/auth//createuser". No login required
router.post("/createuser", [
    // so we are giving the validations
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "password must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        // check whether the user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);    // salt generate ho kr milega
        const secPass = await bcrypt.hash(req.body.password, salt);  //await kiya hai isko kyo ki ye promise return krega..

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        // create session token using id.
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        success = true;
        res.json({success, authtoken });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error..");
    }
    // aab .then ka work nhi hain because we have async function and if else statement..
    // .then(user => res.json({user})) 
    // .catch(err => {console.log(err)
    // res.json({error: "Please enter a unique value for email"})})  //duplicate value add krne pr console error dikhayga
    // res.send(req.body); //isse uparwali line mai res.json kr diya hai toh is line ki need nhi hai..
    console.log("Data Send Succesfully");
})




// Route 2 Authenticate a user using POST "/api/auth/login". no  login required
router.post("/login", [
    // so now we check the validations email and password correct or not..
    body('email', "enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false;
    // koi error hua toh ye error bhej dega
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;   //req.body se email or paassword ka bahar nikala
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ errors: "Please Try to login with correct credentials.." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, errors: "Please Try to login with correct credentials.." });

        }
        // user ka data bhej denge aab..
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true; 
        res.json({success, authtoken });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error..");
    }

})

// Route 3: Get Loggedin User Details using: POST "/api/auth/getUser"   Login required
// so aab hum kya krenge token se id fetch krenge 
router.post("/getuser",fetchuser, async (req, res) => {
    
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error..");

    }
})
module.exports = router
// tokens:- like jab user login krega tab hum usse token denge hum use krenge (json webtoken package) ye kya krta hai ki client and server ke beech mai secure communication krta hai..