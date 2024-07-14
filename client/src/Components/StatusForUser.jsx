import React from 'react';
import axios from 'axios';
import './StatusForUser.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import Header from './Header';
import { useContext } from 'react';
import { UserContext } from '../App';

function StatusForUser() {
    const { user } = useContext(UserContext);
    const [approvedDropdownValues, setApprovedDropdownValues] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://127.0.0.1:3000/contactmsyt/installreqs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            if (res.data.success) {
                const approvedValues = res.data.contacts.filter(contact => contact.Status === 'approved').map(contact => contact.Dropdown);
                setApprovedDropdownValues(approvedValues);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


    return (

        <>
            <Header/>
            <div className='bg-light'>
                <span className='Autofill'>Name:{localStorage.getItem('name')}</span>
                <span className='Autofill'>Location: Noida</span>
                <span className='Autofill'>Department: BIS</span>
            </div>
            <div className='d-flex'>
                <div className='col-2 box bg-light' id='box2'>
                    <button className='btn btn-primary block bttn mb-2' type="submit"><a href='Usser' className='text text-light text-decoration-none'>New Request</a></button>
            
                    <button className='btn btn-primary block bttn text-light' style={{ backgroundColor: 'red', border: '1px solid red' }} type="submit"><a className='text text-light text-decoration-none' href="/Login">Log Out</a></button>
                </div>

                <div className='w-overflow-auto col-1 box bg-light needs-validation' >
                
                <div className='container'>
                <div>Approved Software List:</div>
                <br/>
                <br/>
                
                <ul>
                <div>
                    {approvedDropdownValues.map((value, index) => (
                    
                        <li key={index}><a href="https://zoom.us/support/download">{value}</a></li>
                    ))}
                    </div>
                </ul>
                
            </div>



                </div>

            </div>
        </>
    );



    
}

export default StatusForUser;

