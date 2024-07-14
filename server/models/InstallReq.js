import mongoose from "mongoose";


const InstallReqSchema = new mongoose.Schema({  //var
   /* id: {
        type: String,
        require: true,
    },*/
    Dropdown: {
        type: String,
        require: true
    },
    DifferentSoft: {
        type: String,
        require: true,

    },
    Purpose: {
        type: String,
        require: true,

    },
    Hostname: {
        type: String,
        require: true
    },
    Remark: {
        type: String,
        require: true
    },
    Status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'], // Example status options
        default: 'pending' // Default status
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})



const InstallReqModel = mongoose.model("InstallReq", InstallReqSchema);
export { InstallReqModel }

