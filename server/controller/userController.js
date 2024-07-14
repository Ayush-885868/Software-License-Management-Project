import express from 'express';
//import {User} from'../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv  from "dotenv"
import {UserModel} from '../models/User.js'
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
dotenv.config({path:"../config/.env"})

const Register = async(req, res) => {
  
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const { name, designation, email, password } = req.body;

 try {
    const userExist = await UserModel.findOne({email});
    if (userExist) {
      return res.status(400).json({ errors: [{ msg: 'User already existed' }],
     });
    }
    const hashPassword = await bcrypt.hash(password,12)  //12 unique character in our password it is salting 
    const newUser = new UserModel({
      name,
      designation,
      email,
      password:hashPassword
  })   
  
  const result = await newUser.save()
  result._doc.password = undefined;
  return res.status(201).json({success:true, ...result._doc})

  } catch(err){
    console.log(err)
    return res.status(500).json({error: err.message})
  }

  //return res.status(200).json("ok")
  

};


const Login = async(req, res) => {
  
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const {email, password } = req.body;

 try {
    const userExist = await UserModel.findOne({email});
    if (!userExist) {
      return res.status(400).json({ errors: [{ msg: 'User Not registered' }],
     });
    }
    const isPasswordOk = await bcrypt.compare(password, userExist.password)  //here password  is compairing with encrypted password 
    if(!isPasswordOk){
      return res.status(400).json({ errors: [{ msg: "Wrong Password" }],
     });
    }
   /* const newUser = new UserModel({
      email,
      password:hashPassword
  })   
  
  const result = await newUser.save()*/
  const token = jwt.sign({_id: userExist._id}, process.env.JWT_SECRET_KEY, {expiresIn:"3d"})   // 1-payload (is a string which we are storing of a user that is ID) 2:- for access secret key  3:- optional for expiring means after 3 daya we have to login again to regenerate a new token
  //userExist._doc.password = undefined;
  const user = {...userExist._doc, password:undefined}
  return res.status(201).json({success:true, user, token })

  } catch(err){
    console.log(err)
    return res.status(500).json({error: err.message})
  }
  

};



const Auth = (req,res)=>{
  return res.status(200).json({success:true, user:{...req.user._doc}})
}





//module.exports = { Registration, Login };
export {Register,Login, Auth};