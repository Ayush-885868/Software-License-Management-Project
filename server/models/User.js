import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({  //var
     name: {
          type:String,
          require:true,
          //unique:true
     },
     designation: {
          type:String,
          require:true
          },
     email: {
          type:String,
          require:true,
           unique:true
          },
     password: {
          type:String,
          require:true
     } 
})



const UserModel= mongoose.model("User", UserSchema);
export {UserModel}
//module.exports = mongoose.model('User', userSchema);





//module.exports = RegisterModel;

//export {UserModel1 as softReq}
//module.exports = {User,softReq }