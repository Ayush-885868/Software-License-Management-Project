import express from "express"
import dotenv  from "dotenv"
import cors from "cors"
import './config/db.js'

//import mongoose from 'mongoose'

import {Router} from './routes/routes.js'

/*import cookieParser from "cookie-parser"
import {UserRouter} from './routes/user.js'
import {SoftReqRouter} from './routes/SoftReq.js' ////
import {softReq} from './model/User.js'
import {errorMiddleware} from'./middleware/errorMiddleware';*/

const app = express()
app.use(express.json())
app.use(cors());
dotenv.config({path:"./config/.env"})
/*app.use(cors({
    origin: ["http://localhost:5173"], credentials:true})
)

app.use(cors());
app.use(cookieParser())
app.use('/auth', UserRouter)*/


app.use('/contactmsyt',Router )

/*app.use(errorMiddleware);
app.get('/',(req,res)=>{
    console.log("hello")
})*/



//app.use('/auth',SoftReqRouter); 
/*router.route('/add').post(function(req, res) {
    let softReq = new softReq(req.body);
    softReq.save()
            .then(todo => {
    res.status(200).json({'comment': 'comment added successfully'});
            })
            .catch(err => {
    res.status(400).send('adding new comment failed');
            });
    }); 
    app.use('/Usser', router);*/
//mongoose.connect('mongodb://127.0.0.1:27017/authentication')
app.listen(process.env.PORT, ()=>{
    console.log("server is running")
}); 












 


