import express from 'express';
import { InstallReqModel } from '../models/InstallReq.js';
/*import jwt from 'jsonwebtoken';
import dotenv  from "dotenv"
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
dotenv.config({path:"../config/.env"})*/

const createRequest = async (req, res) => {
    //console.log(req.body)
    for (var i=0;i<req.body.length;i++){
       // console.log(req.body[i]);
    const {Dropdown, DifferentSoft, Purpose, Hostname, Remark, Status } = req.body[i];
    try {
        const newRequest = new InstallReqModel({
            Dropdown,
            DifferentSoft,
            Purpose,
            Hostname,
            Remark,
            Status,
            postedBy: req.user._id

        })
        const result = await newRequest.save()
    
        
    } catch (err) {
        return res.status(500).json(err.message);

    }
}
    return res.status(201).json({ success: true})
};

const getContacts = async(req,res)=>{

    try{
        const contacts = await InstallReqModel.find({postedBy:req.user._id})
        return res.status(200).json({success:true, contacts})

    }catch(err){
        return res.status(500).json({error:err.message})

    }

}

const getAllContacts = async(req,res)=>{

    try{
        const records = await InstallReqModel.find()
        return res.json(records)

    }catch(err){
        return res.status(500).json({error:err.message})

    }

}

const setChanges = async(req,res)=>{
    try {
        const { id } = req.params;
        const updatedRecord = await InstallReqModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedRecord);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

    /*try{
        const records = await InstallReqModel.find()
        return res.json(records)

    }catch(err){
        return res.status(500).json({error:err.message})

    }*/

}

const createChanges = (req,res)=>{

    /*try{
        const records = await InstallReqModel.find()
        return res.json(records)

    }catch(err){
        return res.status(500).json({error:err.message})

    }*/
    const { softwareUrl, downloadLocation } = req.body;
    /*console.log('Software download initiated');
  res.status(200).send('Software download initiated');*/
  const file = fs.createWriteStream(downloadLocation);
  const sendSuccessResponse = () => {
    console.log('Software download successfully completed.');
    res.status(200).send('Software download successfully completed.');
  };

  request.get(softwareUrl)
    .on('error', (err) => {
      console.error('Error downloading the software:', err);
      res.status(500).send('Error downloading the software.');
    })
    .pipe(file)
    .on('close', sendSuccessResponse)
    .on('error', (err) => {
      console.error('Error saving the file:', err);
      res.status(500).send('Error saving the file.');
    });
};

//}


export {createRequest, getContacts, getAllContacts, setChanges, createChanges}



