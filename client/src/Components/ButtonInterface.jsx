import React, { Component } from 'react';
import './ButtonInterface.css';
import { /*useNavigate ,*/ Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../Components/Header'
import { useContext } from 'react';
import { UserContext } from '../App';
//const {user} = useContext(UserContext)



function ButtonInterface() { 
  //const navigate = useNavigate();
  const { user } = useContext(UserContext);
  var data = /*localStorage.getItem('email');*/user.email;
  



  return (
    <>
      <Header />
      <div className='bg-light' style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px' }}>
        <span className='Autofill'>Name: {user.name}{/*{localStorage.getItem('name')}*/}</span>
        <span className='Autofill'>Location:Noida</span>
        <span className='Autofill'>Department:BIS</span>
      </div>
      <section className='container-fluid text-center bg-light mt-4 justify-content-centre'>
        {
          (data !== "jivanshi.arora@gail.co.in") ?
            <>
              <div><button className='btn btn-primary  ms-5 me-5 mb-2' id='firstBtn'  type='submit'><Link to='/Usser' className='text text-light text-decoration-none'>Request for installation of Software on PC</Link></button></div>
              <div><button className='btn btn-primary  ms-5 me-5 mb-2' type='submit'><Link to='/StatusForUser' className='text text-light text-decoration-none'>View Status of Submitted Requests</Link></button></div>
              <div><button className='btn btn-primary  ms-5 me-5 mb-2' type='submit'><Link to='/UserStatus' className='text text-light text-decoration-none'>View Status</Link></button></div>
              <div><button className='btn  bg-danger mb-5 ms-5 me-5' type='submit'><Link to='/Login' className='text text-light text-decoration-none'>Log Out</Link></button></div>
              
            </> :
            <>
              
              <div><button className='btn btn-primary  ms-5 me-5 mb-2' type='submit'><Link to='/Admin' className='text text-light text-decoration-none'>Admin DashBoard</Link></button></div>
              <div><button className='btn  bg-danger mb-5 ms-5 me-5' type='submit'><Link to='/Login' className='text text-light text-decoration-none'>Log Out</Link></button></div>
            </>

        }

        
      </section>
      
    </>
  );
}



export default ButtonInterface;