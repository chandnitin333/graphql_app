import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../gqloperation/mutations'

export default function SignUp() {
    const [fromData, setFromData] = useState({})
    const [signupUser,{data,loading,error}]=useMutation(SIGNUP_USER)
    if(loading) return <h1>Loading...</h1>
    
    const handleChange =(e)=>{
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value

        })
    }
    const handleSubmit = (e)=>{

        e.preventDefault()
        signupUser({
            variables:{
                userNew:fromData

            }
        })
    }
  return (
    <div className='container my-container'>
        {
            error &&
            <div className='red card-panel'>{error.message}</div>
        }
        {
            data && data.user &&
            <div className='green card-panel'>{data.user.fistName} is SignUp, You can login now !</div>
        }
        <h5 > Signup!! </h5>
        <form  onSubmit={(e)=> handleSubmit(e)}>
        <input
            type='text'
            placeholder='FirstName'
            name="firstName"
            onChange={handleChange}
            required />
        <input
            type='text'
            placeholder='LastName'
            name="lastName"
            onChange={handleChange}
            required />

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
            <Link to="/login"><p>Already have an account</p></Link>
              
            <button className='btn #d1c4e9 deep-purple' > Submit</button>
        </form>
        
    </div>
  )
}
