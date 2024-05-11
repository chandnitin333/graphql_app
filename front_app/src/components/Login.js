import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../gqloperation/mutations'

export default function Login() {
    const navigate = useNavigate()
    const [fromData, setFromData] = useState({})
    const [signInUser,{data,loading,error}] =  useMutation(LOGIN_USER,{
        onCompleted(data){
            localStorage.setItem("token",data.user.token)
            navigate("/")
        }
    })
    if(loading) return <h1>Loading...</h1>
    // if(data){
    //     localStorage.setItem("token",data.user.token)
    //     navigate("/")

    // }
    const handleChange =(e)=>{
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value

        })
    }
    const handleSubmit = (e)=>{

        e.preventDefault()
        signInUser({
            variables:{
                userSignin:fromData
            }
        })
    }
  return (
    <div className='container my-container'>
        {
            error &&
            <div className='red card-panel'>{error.message}</div>
        }
        <h5 > Login </h5>
        <form  onSubmit={(e)=> handleSubmit(e)}>
            <input
            type='email'
            placeholder='email'
            name="email"
            
            onChange={handleChange}
            required />
            <input
            type='password'
            name="password"
            placeholder='Password'
            
            onChange={handleChange}
            required />
            <Link to="/signup"><p>Don't have an account</p></Link>
            <button className='btn #d1c4e9 deep-purple' > Login</button>
        </form>
        
    </div>
  )
}
