import React,{Component} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


   class Header extends Component{
    render(){
        return(
         
   <>
   <div className=' head w-100 bg-primary'>
    <div className='navbar-left ps-0 ms-0'>
   <img src="gaill.png" alt ="logo" className='rounded float-start pt-2 me-5' />
   </div>
   <div className='navbar-right'>
   <img src="g20.png" alt ="logo" className='rounded float-end  pb -1pe-1 me-0'/>
   <img src="engLogoAzadi.png" alt ="logo" className='ro unded float-end px-1'/>
   </div>
   <h4 className='rounded d-block text-center ms-2 pt-4'>Software License Management</h4>
   </div>
   </>
    );
    }
  }
  
  export default Header;
  