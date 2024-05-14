const express=require('express');
const router=express.Router();                                         // the router converts the hhtp into get or post etc.
const User=require('../models/User');
const Admin=require('../models/Admin');
const bcrypt = require('bcrypt'); 
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='fortoken';


// Route 0 
router.get('/fetchalladmin', async (req, res) => {
  try {
      const places = await Admin.find();
      res.json(places);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
  }
});
// route 0.1
router.get('/fetchallusers', async (req, res) => {
  try {
      const places = await User.find();
      res.json(places);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
  }
});
// Route 1
router.post('/createuser', [
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      // Check if the userid is already taken
      let user = await User.findOne({ userid: req.body.userid });
      if (user) {
        return res.status(400).json({ success: false, error: "This userid is already7882 taken" });
      }
  
      // Hash the password
      const hash = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user
      user = new User({
        name: req.body.name,
        userid: req.body.userid,
        coordinates:req.body.coordinates,
        password: hash,
      });
  
      await user.save();
  
      // Generate authentication token
      const payload = { user: { id: user.id } };
      const authtoken = jwt.sign(payload, JWT_SECRET);
  
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  });


//   rouetr 2
router.post('/login',[
    body('password','Password cannot be blank').exists()],
    async(req,res)=>{
    
      // if there are errors, return bad request and the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
    const {username,password}= req.body;
    try{
      let user=await Admin.findOne({username});
      if(!user){
        const success=false;
        return res.status(400).json({success,errror:"Invalid username enter valid credentials"});}
  
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        const success=false;
        return res.status(400).json({success,errror:"password Enter valid credentials"});}
  
      const data={          // here we have make a const named data in which we have stored computergeneterated id of user so we can make token for the user. you will be able to see tthis id when you are going to run this request on thunder client
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      const success=true;
      res.json({success,authtoken})
  
    } catch (error){ 
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
    }
    )

    // Route 3
    router.post('/getuser',fetchuser,async (req,res)=>{      
    try{
      let userId=req.user.id; 
      const user=await Admin.findById(userId).select("-password")
      res.send(user)
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal error occured");
    }
  })

  
//   Router 4
router.post('/register', [
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      // Check if the username is already taken
      let user = await Admin.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).json({ success: false, error: "This username is already taken" });
      }
  
      // Hash the password
      const hash = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user
      user = new Admin({
        name: req.body.name,
        username: req.body.username,
        password: hash,
      });
  
      await user.save();
  
      // Generate authentication token
      const payload = { user: { id: user.id } };
      const authtoken = jwt.sign(payload, JWT_SECRET);
  
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  });

  module.exports=router
