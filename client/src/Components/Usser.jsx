import React from 'react';
import './User.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../App';
import { toast } from 'react-toastify';





function Usser() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState({ Dropdown: '', DifferentSoft: '', Purpose: '', Hostname: '', Remark: '' });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({ ...data, [name]: value });
        console.log(value);
    }

    /**************************************************************************/



    const [Delete, setDelete] = useState([]);
    const [AddedData, setAddedData] = useState([]);  // new state object foe added data to below list
    const submitHandler = (e) => {
        e.preventDefault();
        const newRecord = { ...data, id: new Date().getDate().toString() + "_" + new Date().getTime().toString() }; // adding new record inside a variable newRecord


        setAddedData([...AddedData, newRecord]);  //(for old record, for currently added new record)
        setData({ Dropdown: '', DifferentSoft: '', Purpose: '', Hostname: '', Remark: '' }) // after on clicking on add button our form will be empty
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:3000/contactmsyt/add-request', AddedData, {
            headers: {
                Authorization: `Berear ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                if (res.data.success) {
                    toast.success('Requested Added Successfully.', {
                        position: "top-right",
                        autoClose: 2000,
                    });

                    setAddedData({ Dropdown: '', DifferentSoft: '', Purpose: '', Hostname: '', Remark: '' })
                }
                navigate('/Usser');
            })

            .catch((err) => {
                console.log(err);

            });


        navigate('/Usser');

    };


    const handleDelete = (index) => {
        const newArray = [...AddedData];
        newArray.splice(index, 1); // Remove the item at the specified index
        setAddedData(newArray); 
    };

    return (
        <>
            <Header />
            <div className=' containerr-fluid border border-dark bg-light ' id="auth" style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px' }}> {/*border border-white*/}
                {
                    user ? <>
                        <span className='border border-light Autofill '>Name:{localStorage.getItem('name')}</span>
                        <span className='border border-light Autofill '>Location:Noida</span>
                        <span className='border border-light Autofill '>Department:BIS</span>
                    </>
                        : <>

                            <span className='border border-white  Autofill '>Location:</span>
                            <span className='border border-white Autofill '>Department:BIS</span>
                        </>

                }

            </div>
            <div className='border border-white containerr'>
                <div className='col-2 box bg-light ms-1 mt-0' id='box2'>
                    <button className='btn btn-primary block ps-1 bttn mt-3 h-25' type="submit" ><a href="/UserStatus" className='text text-white text-decoration-none'>View Status</a></button>
                    <button className='btn btn-danger  block ps-1 bttn mt-3 h-25' type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
                </div>

                <div className='col-1 row-1 box bg-light ms-1 mt-0 needs-validation' id='box1' >
                    <form onSubmit={submitHandler}>


                        <tr><td>Software Required:</td>
                            <td>
                                <Form.Select className=' mt-5 dropDownList was-validated' id="select" size="sm" name='Dropdown' aria-labelledby="dropdownMenuLink" onChange={handleChange} value={data.Dropdown} required>
                                    <label>software to be installed</label>
                                    {/*<select ><a href="#">List of softwares</a></select>*/}
                                    <option >LIST OF SOFTWARES</option>
                                    <option >CHROME</option>
                                    <option >MICROSOFT EDGE</option>
                                    <option >SKYPE</option>
                                    <option >SQL SERVER</option>
                                    <option >VISUAL STUDIO CODE</option>
                                    <option >ZOOM MEETING</option>
                                    <option >OTHERS</option>
                                    <div class="invalid-feedback">Please fill out this field.</div>

                                </Form.Select>
                            </td>
                        </tr>


                        <br />


                        {
                            (data.Dropdown === "OTHERS") ?
                                <>
                                    <tr>
                                        <td style={{ alignContent: 'right' }}>If others, specify name of Software:</td>
                                        <td style={{ alignContent: 'left' }}><textarea id='SoftName' autoComplete='off' name='DifferentSoft' className=' InputField' onChange={handleChange} value={data.DifferentSoft} required /></td>
                                    </tr>


                                    <tr>
                                        <td style={{ alignContent: 'right' }}>Purpose:</td>
                                        <td style={{ alignContent: 'left' }}> <textarea type='text' id='pur' autoComplete='off' name='Purpose' className=' InputField' onChange={handleChange} value={data.Purpose} required /></td>
                                    </tr>


                                    <tr>
                                        <td style={{ alignContent: 'right' }}>Hostname:</td>
                                        <td style={{ alignContent: 'left' }}><textarea type='text' id='hostname' autoComplete='off' name='Hostname' className=' InputField' onChange={handleChange} value={data.Hostname} required pattern="^[a-zA-Z][a-zA-Z\d-]{1,22}[a-zA-Z\d]$" /></td>
                                    </tr><br />


                                    <tr>
                                        <td style={{ alignContent: 'left' }}>How to find hostname(<a href='https://www.configserverfirewall.com/windows-10/find-hostname-in-windows/' style={{ color: 'blueviolet' }}>Link to pdf</a>)</td>
                                    </tr>

                                    <tr>
                                        <td style={{ alignContent: 'right' }}> Remarks, if any:</td>
                                        <td style={{ alignContent: 'left' }}><textarea type='text' id='Remark' autoComplete='off' name='Remark' className='InputField' onChange={handleChange} value={data.Remark} /></td>
                                    </tr>
                                </> : <>


                                    <tr>
                                        <td style={{ alignContent: 'right', }}>Purpose:</td>
                                        <td style={{ alignContent: 'left', marginLeft: '-200px' }}> <textarea type='text' id='pose' autoComplete='off' name='Purpose' className=' InputField' onChange={handleChange} value={data.Purpose} required /></td>
                                    </tr>


                                    <tr>
                                        <td style={{ alignContent: 'right', marginRight: '200px' }}>Hostname:</td>
                                        <td style={{ alignContent: 'left' }}><textarea type='text' id='host' autoComplete='off' name='Hostname' className='InputField' onChange={handleChange} value={data.Hostname} required /></td>
                                    </tr><br />


                                    <tr>
                                        <td style={{ alignContent: 'left' }}>How to find hostname(<a href='https://www.configserverfirewall.com/windows-10/find-hostname-in-windows/' style={{ color: 'blueviolet' }}>Link to pdf</a>)</td>
                                    </tr>

                                    <tr>
                                        <td style={{ alignContent: 'right' }}> Remarks, if any:</td>
                                        <td style={{ alignContent: 'left' }}><textarea type='text' id='Remark' autoComplete='off' name='Remark' className='InputField' onChange={handleChange} value={data.Remark} /></td>
                                    </tr>
                                </>

                        }
                        <button type='Submit' className='btn btn-success' id='bttn'>Add</button>

                    </form>

                    <table className=' table row-2 box light ms-0' >
                        <thead>
                            <tr>
                                {/* <th scope='row'>ID</th>*/}
                                <th scope='row'>Selected Software</th>
                                <th scope='row'>Other Software</th>
                                <th scope='row'>Purpose</th>
                                <th scope='row'>Hostname</th>
                                <th scope='row'>Remarks</th>
                                <th scope='row'>Edit</th>
                            </tr>

                        </thead>
                        <tbody>
                            {Array.isArray(AddedData) ? AddedData.map((item, index) => ( // Use index as the second argument
                                <tr key={index}>
                                    <td>{item.Dropdown}</td>
                                    <td>{item.DifferentSoft}</td>
                                    <td>{item.Purpose}</td>
                                    <td>{item.Hostname}</td>
                                    <td>{item.Remark}</td>
                                    <button
                                        className='btn btn-danger me-1'
                                        style={{ width: '60px', height: '40px' }}
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                    
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                    <Form onSubmit={handleSubmit}>

                        <button className='btn btn-primary center  ' type='Submit' id='bttnLast'>Submit</button>
                    </Form>
                </div>



            </div>
        </>
    );


}



export default Usser;
