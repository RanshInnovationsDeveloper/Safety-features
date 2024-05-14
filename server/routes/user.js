const express=require('express');
const router=express.Router();                                         // the router converts the hhtp into get or post etc.
const User=require('../models/User');
const bcrypt = require('bcrypt'); 
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='fortoken';


// Route 1:
// firebase to be used because credntials are more safe in firebase. Safer
router.post('/login',[
  // here we have use code form the express validate
  body('password','Password cannot be blank').exists()],
  async(req,res)=>{
  
    // if there are errors, return bad request and the errors 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
  // till this line whole code is copied from the website

  const {userid,password}= req.body;
  try{
    let user=await User.findOne({userid});
    if(!user){
      const success=false;
      return res.status(400).json({success,errror:"Invalid userid enter valid credentials"});}

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

  // Route 2: get login user detail using: POST api/auth/getuser does require authentication
  router.post('/getuser',fetchuser,async (req,res)=>{      // here fetchuser is a middleware which is extratcing user data form the token and is calling next function 
  try{
    let userId=req.user.id;          // the id of the user information is random and is assigned by the computer only not by ourselves it is same id which we used for making token for the user
    const user=await User.findById(userId).select("-password")
    res.json("this is it")
  }catch (error){
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
})

router.get('/userCoordinates', fetchuser, async (req, res) => {
  try {
      // Extract user id from request
      const userId = req.user.id;

      // Find the user by id in the database
      const user = await User.findById(userId);

      // If user found, send back coordinates
      if (user) {
          res.json({ coordinates: user.coordinates });
      } else {
          // If user not found, send error message
          res.status(404).json({ error: "User not found" });
      }
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occurred");
  }
});

module.exports=router
