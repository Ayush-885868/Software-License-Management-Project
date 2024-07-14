import express from 'express'
const router = express.Router();
import {Register, Login, Auth} from '../controller/userController.js'
//import bcrypt from 'bcrypt'
import { body } from 'express-validator'
import { VerifyUser } from '../middleware/VerifyUser.js';
import { createRequest, getContacts, getAllContacts, setChanges, createChanges } from '../controller/installreqController.js';
//import {User} from '../models/User.js'
//import {softReq} from '../model/softReq.js';
//import jwt from 'jsonwebtoken'




//user routes
router.post('/Register',[
    body('name').trim().notEmpty().withMessage("Name should not be empty"),
    body('designation').trim().notEmpty().withMessage("Designation should not be empty"),
    body('email').trim().notEmpty().withMessage("Email should not be empty")
        .isEmail().withMessage("Invalid Email!!!"),
    body('password').trim().notEmpty().withMessage("password should not be empty")
        .isLength({ min: 5, max: 30 }).withMessage("Password length be 5-30")
], Register) // here we will call controller



router.post('/Login',[  // this will call login controller
    body('email').trim().notEmpty().withMessage("Email should not be empty")
        .isEmail().withMessage("Invalid Email!!!"),
    body('password').trim().notEmpty().withMessage("password should not be empty")
        .isLength({ min: 5, max: 30 }).withMessage("Password length be 5-30")
],Login) 



router.get('/verify', VerifyUser, Auth)






// software install request routes

router.post('/add-request',VerifyUser ,createRequest) // this will call  controller

router.get('/installreqs',VerifyUser ,getContacts)

router.get('/contacts', getAllContacts)
router.put('/records/:id', setChanges)
router.post('/approvedSoftware', createChanges)










/* const {name, designation, email, password} = req.body;
 const user = await User.findOne({email})
 if(user){
     return res.json({message:"user already existed"})
 }

 const hashpassword = bcrypt.hash(password, 10) // here sort string size will be 10
 const newUser = new User({
     name,
     designation,
     email,
     password:hashpassword,
 })  

 await newUser.save()
 return res.json({status: true, message:"Record registered"})
})



 router.post('/Login', async(req,res)=>{  //for login route // this cookie is using in the Loginn
 const {email, password} = req.body; 
 //generating a token to store it inside the cookie
 const user = await User.findOne({email}) //here we are checking in User model
 if(!user){
     return res.json({message:"user is not registered"})
 }
 //if user is registered then now compare the password becoz password in database is in hash form and our entered
 //password is in plain text form

 const validPassword = await bcrypt.compare(password, user.password)
 console.log(validPassword);
 console.log(bcrypt.hash(password));

 if(!validPassword){
     return res.json({message: "Password is incorrect"})
 }
 //if password is correct and user registered before 
 //then generate a token then will store the token  inside the cookies of user to use  it in the future for
 // the Authentication purpose

 const token = jwt.sign({name:user.name}, process.env.KEY, {expiresIn:'1h'})//jwt is used for securely method to exchange the data between two parties it is used for Authentication and authorisation
 //and there are 3 part(payload, key(secret key at least 32 character), {option for expiring}  )
 //now i will store this token inside the user cookies
 res.cookie('token', token, {httpOnly:true,  maxAge:360000})
 return res.json({status:true, message:"login successfully"})

 })  

/* router.post('/Usser', (req,res)=>{
     const {dropdown, DifferentSoft, purpose, hostname, Remark} = req.body
     
     
     console.log(res.json({message:"user already existed"}))
     
 })*/






export {router as Router}