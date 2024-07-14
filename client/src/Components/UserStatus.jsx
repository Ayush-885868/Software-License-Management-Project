import React, { useEffect, useState } from 'react';
import './UserStatus.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import { useContext } from 'react';
import { UserContext } from '../App';
import DataTable from 'react-data-table-component'
//import io from 'socket.io-client';///


const customStyles = {
    rows: {
            Cell: {
                className:'custom-row',
            
        },
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: 600,
        },
    },
    cells: {
        style: {
            fontSize: '13px',
            fontWeight: 500,
        },
    },
};
 //const socket =io('http://127.0.0.1:3000');
function UserStatus() {
    // ... (other code remains unchanged)
    const [contacts, setContacts] = useState([])
    const { user } = useContext(UserContext);
    //const Name = user.name;
    const columns = [

        {
            name: "Dropdown",
            selector: (row) => row.Dropdown
        },
        {
            name: "DifferentSoft",

            selector: (row) => row.DifferentSoft
        },
        {
            name: "Purpose",
            selector: (row) => row.Purpose
        },
        {
            name: "Hostname",
            selector: (row) => row.Hostname
        },
        {
            name: "Remark",
            selector: (row) => row.Remark
        },
        {
            name: "Status",
            selector: (row) => row.Status
        },
        ]

        useEffect(() => {
            axios.get('http://127.0.0.1:3000/contactmsyt/installreqs', {
                headers: {                                                      
                    Authorization: `Berear ${localStorage.getItem('token')}`       
                }
            })
                .then((res) => {
                    if (res.data.success) {
    
                        setContacts(res.data.contacts)
    
                    }
                })
    
                .catch((err) => {
                    console.log(err);
    
                });
    
        }, [])

    /*useEffect(() => {

       // socket.on('statusUpdate', updatedContacts => { ///
           // setContacts(updatedContacts);///
       // });///
        /*axios.get('http://127.0.0.1:3000/contactmsyt/installreqs', {
            headers: {                                                      
                Authorization: `Berear ${localStorage.getItem('token')}`       
            }
        })
            .then((res) => {
                if (res.data.success) {

                    setContacts(res.data.contacts)

                }
            })

            .catch((err) => {
                console.log(err);

            });

            //return () => { //
                // Clean up the Socket.IO event listener on unmount
               // socket.off('statusUpdate');//
            //};//

    }, [])*/
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className='container-fluid border border-dark bg-light' id="Auth" style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px', width: '1142px' }}>
                <span className='border border-light Autofill'>Name:{localStorage.getItem('name')}</span>
                <span className='border border-light Autofill'>Location:Noida</span>
                <span className='border border-light Autofill'>Department:BIS</span>
            </div>
            <div className='border border-white Maincontainer'>
                <div className='col-2 box bg-light ms-1 mt-0' id='box2'>
                    <button className='container-fluid btn btn-primary block bttn mb-2' type="submit"><a href='/Usser' className='text text-light text-decoration-none'>Request For Installation</a></button>
                    <button className='container-fluid btn btn-danger block bttn' type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
                </div>
                <div className='col-1 row-1 box bg-light ms-1 mt-0 me-0' id='box1'>
                    <DataTable
                        columns={columns}
                        //data={contacts}
                        data={contacts.map(contacts => ({ ...contacts, tag: contacts.Status.toLowerCase() }))}
                        customStyles={customStyles}
                        pagination />
                </div>
            </div>
        </>
    );
}


export default UserStatus;





/*import React, { useEffect, useState } from 'react';
import './UserStatus.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import { useContext } from 'react';
import { UserContext } from '../App';
import DataTable from 'react-data-table-component'


const customStyles = {
    rowStyle: {
        style: (row) => ({ 
            backgroundColor: row.Status === 'approved' ? 'green' : row.Status === 'rejected' ? 'red' : 'yellow',
        }),
    },
    headCells: {
        style: {
            fontSize: '15px',//15 + "px",
            fontWeight: 600,
        },
    },
    cells: {
        style: {
            fontSize: '13px',//13 + "px",
            fontWeight: 500,
        },
    },
};

function UserStatus() {
    const [contacts, setContacts] = useState([])
    const columns = [

        {
            name: "Dropdown",
            selector: (row) => row.Dropdown
        },
        {
            name: "DifferentSoft",

            selector: (row) => row.DifferentSoft
        },
        {
            name: "Purpose",
            selector: (row) => row.Purpose
        },
        {
            name: "Hostname",
            selector: (row) => row.Hostname
        },
        {
            name: "Remark",
            selector: (row) => row.Remark
        },
        {
            name: "Status",
            selector: (row) => row.Status
        },
        ]

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/contactmsyt/installreqs', {
            headers: {                                                      
                Authorization: `Berear ${localStorage.getItem('token')}`       
            }
        })
            .then((res) => {
                if (res.data.success) {

                    setContacts(res.data.contacts)

                }
            })

            .catch((err) => {
                console.log(err);

            });

    }, [])
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (

        <>
            <Header />
            

            <div className='container-fluid border border-dark bg-light' id="Auth" style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px', width: '1152px' }}>
                <span className='border border-light Autofill'>Name:</span>
                <span className='border border-light Autofill'>Location:Noida</span>
                <span className='border border-light Autofill'>Department:BIS</span>
            </div>
            <div className='border border-white Maincontainer'>
                <div className='col-2 box bg-light ms-1 mt-0' id='box2'>
                    <button className='container-fluid btn btn-primary block bttn mb-2' type="submit"><a href='/Usser' className='text text-light text-decoration-none'>Request For Installation</a></button>
                    <button className='container-fluid btn btn-danger block bttn' type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
                </div>

                <div className='col-1 row-1 box bg-light ms-1 mt-0 me-0' id='box1' >
                    <DataTable
                        columns={columns}
                        data={contacts}
                        customStyles={customStyles}
                        pagination />
                </div>

            </div>
        
        </>
    );
}

export default UserStatus;*/



