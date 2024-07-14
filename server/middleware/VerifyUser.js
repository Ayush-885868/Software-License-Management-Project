import jwt from "jsonwebtoken";  // this code is for verification of the user
import { UserModel } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config({path:'../config/.env'})

export const VerifyUser =  (req,res,next)=>{
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY,async(err,payload)=>{
            try{
            if(err){
                return res.status(401).json({error:"unauthorized."})
            }
            const user = await UserModel.findOne({_id: payload._id}).select("-password") // fetching the record from database
            req.user = user;
            next()
        }catch(err){
            return res.status(500).json({error:err.message}); //try catch to handle error if our code to fail the record from database

        }
        });
    }
    else{
        return res.status(403).json({error: "Forbidden"})
    }
}