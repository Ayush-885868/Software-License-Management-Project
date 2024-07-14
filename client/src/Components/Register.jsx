import React, { useState } from 'react';
import '../Components/Register.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import Login from './Login';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from './Validation';
import { toast } from 'react-toastify';
import Header from './Header';
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
     
     /*const [name, setUsername] = useState('');
     const [designation, setDesignation] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');*/
    const [values, setValues] = useState({
        name: '',
        designation: '',
        email: '',
        password: ''
    });


    const [errors, setErrors] = useState({}); // storing front end error
    const [serverErrors, setServerErrors] = useState([]); // storing server side error
    const navigate = useNavigate();


    const handleChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value });
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = Validation(values)
        setErrors(errs);
        if (errs.name === "" && errs.designation === "" && errs.email === "" && errs.password === "") {
            axios.post('http://127.0.0.1:3000/contactmsyt/Register', values)
                .then(res => {
                    if(res.data.success){
                    toast.success(`${values.name},Account Created Successfully.`, {
                        position: "top-left",
                        //positionClass:"toast-top-full-width",
                        style:{
                            width:'100%',
                           // color:'red'
                        },
                        autoClose: 2000


                    })
                    navigate('/')
                }
                })
                .catch(err => {
                    if(err.response.data.errors){
                        setServerErrors(err.response.data.errors)
    
                    }
                    else{
                        console.log(err)
                    }
                   // console.log(err);

                })
        }
        /* axios.post('http://localhost:3000/auth/Registration', { name, designation, email, password,})
             .then(response => {
                 if (response.data.status) {
                     navigate('/Login')
                 }
             })
             .catch(err => {
                 console.log(err)
             })*/


    };


    return (
        <>
            <Header />
            <div className='wrapper d-flex align-items-center justify-content-center w-100' style={{ height: '100vh' }}>
                <div className='login '>

                    <form className='needs-validation ' onSubmit={handleSubmit}>


                        <div className='form-group was-validated  mb-2'>
                            <label htmlFor='name' className='form-label'>Username</label>
                            <input type='text' className='form-control' name='name' onChange={handleChange} required ></input>
                            {errors.name && <span className='error'>{errors.name}</span>}



                        </div>

                        <div className='form-group was-validated mb-2'>
                            <label htmlFor='designation' className='form-label'>Designation</label>
                            <input type='text' className='form-control' name='designation' onChange={handleChange} autoComplete='off' required ></input>
                            {errors.designation && <span className='error'>{errors.designation}</span>}

                        </div>


                        <div className='form-group was-validated mb-2'>
                            <label htmlFor='email' className='form-label'>Email-Address</label>
                            <input type='email' className='form-control' name='email' onChange={handleChange} required ></input>
                            {errors.email && <span className='error'>{errors.email}</span>}

                        </div>

                        <div className='form-group was-validated mb-2'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' className='form-control' name='password' onChange={handleChange} required></input>
                            {errors.password && <span className='error'>{errors.password}</span>}

                        </div>
                        {
                        serverErrors.length > 0 && (
                            serverErrors.map((error,index) => (
                                <p className='error' key={index}>{error.msg}</p>
                            ))
                        )
                    }


                        <div>
                            <button type='submit' className='btn btn-success  w-100 block mt-2'>Register Here!</button>


                        </div>
                        <div className='mt-3'>
                            <p>Have an Account?<Link className='text-primary' to='/' >Login</Link></p>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Register;

























