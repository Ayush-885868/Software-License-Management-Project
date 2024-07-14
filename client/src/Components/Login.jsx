import React, { useContext, useState } from 'react';
import '../Components/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Validation from './Validation';
import { toast } from 'react-toastify';
import Header from './Header';
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../App';
//import { useHistory } from 'react-router-dom';  // Explicit import path for useHistory




const Login = () => {

    //const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const { user, setUser } = useContext(UserContext)
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
    if (errs.email === "" && errs.password === "") {
        axios.post('http://127.0.0.1:3000/contactmsyt/Login', values)
            .then(res => {
                if (res.data.success) {
                    toast.success("Login Successfully", {
                        position: "top-left",
                        autoClose: 2000
                    })
                    /*localStorage.setItem("token", res.data.token)
                    localStorage.setItem("name",res.data.user.name)
                    localStorage.setItem("designation",res.data.user.designation)
                    localStorage.setItem("email",res.data.user.email)
                    setUser(res.data.user)*/
                    localStorage.setItem("token", res.data.token)
                    setUser(res.data.user)
                    navigate('/ButtonInterface')
                    //  navigate('/ButtonInterface', { replace: true });
                    // window.history.pushState(null, '', '/ButtonInterface');

                }
            })
            .catch(err => {
                console.log(err)
                if (err.response.data.errors) {
                    setServerErrors(err.response.data.errors)

                }
                else {
                    console.log(err)
                }

            })
    }

    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const errs = Validation(values);
    //     setErrors(errs);

    //     if (errs.email === "" && errs.password === "") {
    //         try {
    //             const res = await axios.post('http://127.0.0.1:3000/contactmsyt/Login', values);
    //             if (res.data.success) {
    //                 toast.success("Login Successfully", {
    //                     position: "top-left",
    //                     autoClose: 2000
    //                 });

    //                 localStorage.setItem("token", res.data.token);
    //                 setUser(res.data.user);

    //                 history.push('/ButtonInterface');
    //             }
    //         } catch (err) {
    //             if (err.response.data.errors) {
    //                 setServerErrors(err.response.data.errors);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     }



    // };


    return (
        <>
            <Header />
            <div className='wrapper d-flex align-items-center justify-content-center w-100' style={{ height: '100vh' }}>
                <div className='login '>

                    <form className='needs-validation ' onSubmit={handleSubmit}>
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
                                serverErrors.map((error, index) => (
                                    <p className='error' key={index}>{error.msg}</p>
                                ))
                            )
                        }
                        <div className='form-group form-check mb-2'>
                            <label htmlFor='checkbox' className='form-check-label'>Remember me</label>
                            <input type='checkbox' className='form-check-input'></input>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-success  w-100 block mt-2'>SIGN IN</button>


                            <p>Don't Have Account?<a className='text-primary' href='./Register' >Register</a></p>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login;


























































































