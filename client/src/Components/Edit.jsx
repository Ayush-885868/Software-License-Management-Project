import React, { useEffect } from "react";
//import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; 


function Edit() {
    const { id } = useParams();
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/posts/'+id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }, [])

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:3001/posts/'+id, data)
        .then(res=>{
            alert("Data Updated Successfully");
            navigate('/StatusForAdmin');
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

            <div>
                    <label /*style={{ alignContent: 'right' }}*/>ID:</label>
                    <input id='SoftName' disabled name='name' className=' InputField' value={data.id}  />
                </div>
                <br/>
                <tr><td>Software Required:</td>
                    <td>
                        <Form.Select className=' mt-5 dropDownList was-validated' size="lg" name='dropdown' aria-labelledby="dropdownMenuLink" value={data.dropdown} onChange={e=>setData({...data, dropdown:e.target.value})} required>
                            <label>software to be installed</label>
                            <select ><a href="#">List of softwares</a></select>
                            <option ><a href="#">List of softwares</a></option>
                            <option ><a href="#">default select</a></option>
                            <option ><a href="#">medium select</a></option>
                            <option ><a href="#">Large select</a></option>
                            <option ><a href="#">others</a></option>

                        </Form.Select>
                    </td>
                </tr>

                <br />
                <tr>
                    <td style={{ alignContent: 'right' }}>If others, specify name of Software:</td>
                    <td style={{ alignContent: 'left' }}><textarea id='SoftName' autoComplete='off' name='DifferentSoft' className=' InputField' value={data.DifferentSoft} onChange={e=>setData({...data, DifferentSoft:e.target.value})} /></td>
                </tr>


                <tr>
                    <td style={{ alignContent: 'right' }}>purpose:</td>
                    <td style={{ alignContent: 'left' }}> <textarea type='text' id='pur' autoComplete='off' name='purpose' className=' InputField' value={data.purpose} onChange={e=>setData({...data, purpose:e.target.value})} /></td>
                </tr>


                <tr>
                    <td style={{ alignContent: 'right' }}>Hostname:</td>
                    <td style={{ alignContent: 'left' }}><textarea type='text' id='hostname' autoComplete='off' name='hostname' className=' InputField' value={data.hostname} onChange={e=>setData({...data, hostname:e.target.value})} /></td>
                </tr><br />


                <tr>
                    <td style={{ alignContent: 'left' }}>How to find hostname(<a href='https://www.configserverfirewall.com/windows-10/find-hostname-in-windows/' style={{ color: 'blueviolet' }}>Link to pdf</a>)</td>
                </tr>

                <tr>
                    <td style={{ alignContent: 'right' }}> Remarks, if any:</td>
                    <td style={{ alignContent: 'left' }}><textarea type='text' id='Remark' autoComplete='off' name='Remark' className='InputField' value={data.Remark} onChange={e=>setData({...data, Remark:e.target.value})} /></td>
                </tr>


                {/*<button type='Submit' id='bttn'>Update</button>*/}

                <button  className='btn btn-info'>Update</button>

            </form>

        </div>
    )
}

export default Edit;