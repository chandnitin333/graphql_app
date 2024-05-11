import { useMutation } from '@apollo/client';
import React,{useState} from 'react';
import { CREATE_QUOTE } from '../gqloperation/mutations';




export default function CreateQuote() {
    const [quote, setQuote] = useState("")
   
    const [createQuote,{data,loading,error}] = useMutation(CREATE_QUOTE,{
      refetchQueries:[
        'getAllQuotes',
        'getMyProfile'
      ]
    })
    if(loading) return <h1>Loading...</h1>
    if(error) {
      console.log("error:",error.message)
    }
    if(data){
      console.log(data)
    }
    const handleSubmit = (e)=>{
      createQuote({
        variables:{
          name:quote
        }
      })
        e.preventDefault()
       
    }
   
  return (
    <div className='container my-container'>
        {
            error &&
            <div className='red card-panel'>{error.message}</div>
        }
        {
            data && 
            <div className='green card-panel'>{data.quote} </div>
        }
        <h5 > Create Quote !! </h5>
        <form  onSubmit={(e)=> handleSubmit(e)}>
        <input
            type='text'
            placeholder='write your quote'
            value={quote}
            onChange={e=>setQuote(e.target.value)}
            required />
       
            <button className='btn #d1c4e9 deep-purple' > Create</button>
        </form>
        
    </div>
  )
}
