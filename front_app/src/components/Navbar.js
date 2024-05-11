import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function Navbar() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  return (
    <div>
       <nav className='#d1c4e9 deep-purple'>
        <div className="nav-wrapper">
        <Link to="/" className="brand-logo left ">Quote App</Link>
        <ul id="nav-mobile" className="right ">
          {
            token ?
            <>
             <li> <Link to="/profile">Profile</Link> </li>
            <li> <Link to="/create">Create</Link> </li>
            <li><button className='red btn' onClick={()=>{
              localStorage.removeItem("token");
              navigate("/login");
            }}> Logout</button></li>
            </>:

            <>
             <li> <Link to="/login">Login</Link> </li>
              <li> <Link to="/signup">Signup</Link> </li>
            </>
          }
           
           
            
        </ul>
        </div>
  </nav>
    </div>
  )
}
