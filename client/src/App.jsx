//import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import { ToastContainer } from 'react-toastify';
import ButtonInterface  from './Components/ButtonInterface';
import Usser from './Components/Usser';
import UserStatus from './Components/UserStatus';
import Admin from './Components/Admin';
import StatusForUser from './Components/StatusForUser';
import Edit from './Components/Edit';
//import InstallSoft from './Components/InstallSoft';
//import "react-toastify/dist/ReactToastify.css"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
//import { RouterProvider } from 'react-router-dom';

//export const UserContext = createContext(null)



export const UserContext = createContext(null)
//export const UserContext = createContext([initialState, () => {}])
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
  path: '/Register',
  element: <Register/>,
  
  },
  
  {
    path: '/ButtonInterface',
    element: <ButtonInterface/>
  },
  {
    path: '/Usser',
    element: <Usser/>
  },
  {
    path: '/UserStatus',
    element: <UserStatus/>
  },
  {
    path: '/Admin',
    element: <Admin/>
  },
  {
    path: '/StatusForUser',
    element: <StatusForUser/>
  },
  {
    path: '/Edit/:id',
    element: <Edit/>
  },
  /*{
    path: '/InstallSoft',
    element: <InstallSoft/>
  }*/
])

function App() {
  const [user, setUser] = useState(); //
  useEffect(()=>{                     //
    axios.get('http://127.0.0.1:3000/contactmsyt/verify',{  //
    headers:{                                                      //
      Authorization:`Berear ${localStorage.getItem('token')}`       //
    }
    } ) //
    .then(res=>{                                           //
      if(res.data.success){                                //
        setUser(res.data.user)                                  //
      }                                                    //
    }).catch(err =>{
      console.log(err)
    })                                                     //
  },[])                                                    //


 /* axios.get('/', async (req, res, next) => {
    try {
      let html = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8')
      // Transform HTML using Vite plugins.
      html = await viteServer.transformIndexHtml(req.url, html)
      res.send(html)
  } catch (e) {
      return next(e)
  }})*/

  return (
   /* <>
    <Header/>
    <ToastContainer/>
    <BrowserRouter>
    
      <div class="bg-light container-fluid h-100 w-100">
    <Routes>
      <Route path ="/Registration" element={<Registration/>}></Route>
      <Route path ="/Login" element={<Login/>}></Route>
      <Route path ="/ButtonInterface" element={<ButtonInterface/>}></Route>
      <Route path ="/Usser" element={<Usser/>} ></Route>
      <Route path ="/UserStatus" element={<UserStatus/> } > </Route>
      <Route path="/Admin" element={<Admin/>}></Route>
      <Route path="/StatusForAdmin" element={<StatusForAdmin/>}></Route>
      <Route path="/Edit/:id" element={<Edit/>} />
      
    </Routes>
    </div>
    </BrowserRouter>
    </>*/
    <>
    <ToastContainer/>
    <UserContext.Provider value={{user,setUser}}>
    <RouterProvider router={router}/>
    </UserContext.Provider>
    </>
  ) 
}
//export const UserContext = createContext(null)
export default App
