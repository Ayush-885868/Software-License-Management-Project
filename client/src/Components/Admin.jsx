import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare } from 'react-icons/fa6'

const customStyles = {
    rows: {  
        styled: {
            backgroundColor: (row) => {
                if (row.Status === 'approved') {
                    return 'green';
                } else if (row.Status === 'rejected') {
                    return 'red';
                } else {
                    return 'yellow';
                }
            }
        },
    },
    headCells: {
        style: {
            fontSize: 15 + "px",
            fontWeight: 600,
        },
    },
    cells: {
        style: {
            fontSize: 13 + "px",
            fontWeight: 500,
        },
    },
};







function Admin() {
    const [contacts, setContacts] = useState([]);
    const [filterText, setFilterText] = useState('');


    const columns = [
       /* {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },*/
       /* {
            name: 'ID',
            selector: (row)=>row.id,
            sortable: true,
        },*/

        {
            name: "Software_Name",
            selector: (row) => row.Dropdown
        },
        {
            name: "Other_Software",

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
            cell: (row) => (
                <select value={row.Status} onChange={(e) => handleStatusChange(e, row)}>
                    <option value="pending" className="badge text-bg-success">Pending</option>
                    <option value="approved" className="badge text-bg-danger">Approved</option>
                    <option value="rejected" className="badge text-bg-warning">Rejected</option>
                </select>
            )
        },
    ]


    /*const customFilterText = (rows, field, filterText) => {
        return rows.filter(row => row[field].toLowerCase().includes(filterText.toLowerCase()));
    };

        const filteredItems = contacts.filter(item =>
            Object.keys(item).some(key =>
                customFilterText(item, key, filterText)
            )
        );*/


    const handleStatusChange = async (e, row) => {
        try {
            const updatedRow = { ...row, Status: e.target.value };
            await axios.put(`http://127.0.0.1:3000/contactmsyt/records/${row._id}`, updatedRow,{
                headers: {
                    Authorization: `Berear ${localStorage.getItem('token')}`
                }
            }) // Assuming the endpoint for updating the record is '/api/records/:id'
                // Handle successful update
                .then((res) => {
                    if (res.data.success) {
                        //console.log(updatedRow)
                        //console.log("updated");
                        setContacts(prevContacts => prevContacts.map(contact => {
                            if (contact._id === row._id) {
                                return { ...contact, Status: e.target.value };
                            }
                            return contact;
                        }));
                    }
                }).catch((err) => {
                    // Handle error
                    console.log(err);

                });
        } catch (error) {
            console.log(error)
        }
    };


    /* useEffect(()=>{
         axios.get('http://127.0.0.1:3000/contactmsyt/installreqs'
                 headers: {                                                      //
                     Authorization: `Berear ${localStorage.getItem('token')}`       //
                 }
             )
                 .then((res) => {
                     if (res.data.success) {
                         
                     setContacts(res.data.contacts)
                         
                     }
                 })
             
                 .catch((err) => {
                     console.log(err);
 
                 });
         
     },[])*/

    useEffect(() => {
        // setLoading(true)
        fetch('http://127.0.0.1:3000/contactmsyt/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            // setLoading(false)
            .catch(error => console.error('Error fetching records: ', error)
                //setLoading(false)
            );

    }, [contacts]);


    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    /*const filteredItems = contacts.filter(item =>
        Object.keys(item).some(
            (key) =>
                key !== 'status' && // Exclude status from filtering
                item[key].toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );*/
    /*const filteredItems = contacts.filter(item => {
        for (let key in item) {
            if (key !== 'Status' && item[key] && item[key].toString().toLowerCase().includes(filterText.toLowerCase())) {
                return true;
            }
        }
        return false;
    });*/

    return (

        <>
            <Header />

            <div className='bg-light' style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px' }}>
                <span className='Autofill'>Name:{user.name}</span>
                <span className='Autofill'>Location:Noida</span>
                <span className='Autofill'>Department:BIS</span>
            </div>
            <div className='Maincontainer'>
                <div className='col-2 box bg-light' id='box2'>
                    <button className='btn btn-primary block bttn mb-2' type="submit"><a href='/Usser' className='text text-light text-decoration-none'>New Request</a></button>
                    <button className='btn btn-primary block bttn' style={{ backgroundColor: 'red', border: '1px solid red' }} type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
                </div>


                <div className='col-1 box bg-light contact-list ' >
               {/* <input
                    type="text"
                    placeholder="Search by any field"
                    onChange={(e) => setFilterText(e.target.value)}
                />*/}
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

export default Admin;





/****import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare } from 'react-icons/fa6'
//import CircleLoader from 'react-spinners/CircleLoader'

const customStyles = {
    headCells: {
        style: {
            fontSize: 15 + "px",
            fontWeight: 600,
        },
    },
    cells: {
        style: {
            fontSize: 13 + "px",
            fontWeight: 500,
        },
    },
};



const handleStatusChange = async (e, row) => {
    try {
        const updatedRow = { ...row, Status: e.target.value };
        await axios.put(`http://127.0.0.1:3000/contactmsyt/records/${row._id}`, updatedRow) // Assuming the endpoint for updating the record is '/api/records/:id'
            // Handle successful update
            .then((res) => {
                if (res.data.success) {
                    console.log("updated");
                }
            }).catch(error)
        // Handle error
        console.log(err);

    }
catch(error){
    console.log(error)
}};

function Admin() {
    const [contacts, setContacts] = useState([])
    // const [loading, setLoading] = useState(false)
    /* const handleEdit = (id) => {
      // Implement edit functionality based on the cell's value
      console.log('Editing row with ID:', id);
    };*/
/****const columns = [
    {
        name: "_id",
        selector: (row) => row._id
    },
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
        /* name:"Status",
         selector:(row)=>row.Status*/
/****  name: "Status",
 cell: (row) => (
     <select value={row.Status} onChange={(e) => handleStatusChange(e, row)}>
         <option value="pending">Pending</option>
         <option value="approved">Approved</option>
         <option value="rejected">Rejected</option>
     </select>
 )
},
/*{
 name:"Action",
 selector:(row)=><>
 <FaPenToSquare className='table-icon1'>
 </FaPenToSquare>
{/* <aPenTrashCan className='table-icon2'/>*///}
//</>
//},


///***** */ ]
/* useEffect(()=>{
     axios.get('http://127.0.0.1:3000/contactmsyt/installreqs'
             headers: {                                                      //
                 Authorization: `Berear ${localStorage.getItem('token')}`       //
             }
         )
             .then((res) => {
                 if (res.data.success) {
                     
                 setContacts(res.data.contacts)
                     
                 }
             })
         
             .catch((err) => {
                 console.log(err);
 
             });
     
 },[])*/

/*useEffect(() => {
    // setLoading(true)
    fetch('http://127.0.0.1:3000/contactmsyt/contacts')
        .then(response => response.json())
        .then(data => setContacts(data))
        // setLoading(false)
        .catch(error => console.error('Error fetching records: ', error)
            //setLoading(false)
        );

}, []);
const { user } = useContext(UserContext);
const navigate = useNavigate();
/*const handlerSubmit = () => {
    navigate("/Usser");
}*/
/***return (

     <>
         <Header />

         <div className='bg-light' style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px' }}>
             <span className='Autofill'>Name:</span>
             <span className='Autofill'>Location:Noida</span>
             <span className='Autofill'>Department:BIS</span>
         </div>
         <div className='Maincontainer'>
             <div className='col-2 box bg-light' id='box2'>
                 <button className='btn btn-primary block bttn mb-2' type="submit"><a href='/Usser' className='text text-light text-decoration-none'>New Request</a></button>
                 {/*} <button className='btn btn-primary block bttn mb-2' type="submit"><a href="/Admin" className='text text-light text-decoration-none'>Admin Dashboard</a></button>
                 <button className='btn btn-primary block bttn mb-2' type="submit"><a href="#" className='text text-light text-decoration-none'>Update Software List</a></button>*/       //***}
/*****   <button className='btn btn-primary block bttn' style={{ backgroundColor: 'red', border: '1px solid red' }} type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
</div>

{/* {
loading ? (
  <div className='loader'>
<CircleLoader
loading = {loading}
size={50}
aria-label="Loading Spinner"
data-testid="loader"/></div>)
:
(          *///}
/***  <div className='col-1 box bg-light contact-list ' > {/*needs-validation*/    //***}
/***<DataTable
    columns={columns}
    data={contacts}
    customStyles={customStyles}
    //CustomCell value={yourValue} onEdit={handleEdit}
    pagination />
{/*{length.contacts === 0 ? <h1>Add a Request</h1> : <></>}*/    //***}
///*** </div>

{/*)}*/ }



/*** </div>
</>
);
}

export default Admin;***/

