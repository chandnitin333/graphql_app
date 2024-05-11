import React from 'react'
import {  useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import {GET_ALL_QUOTES} from '../gqloperation/queries'

export default function Home() {
  const {loading,error,data} = useQuery(GET_ALL_QUOTES)
 
  
  if(loading) return <h1>Loading...</h1>

  if(error) {
    console.log("error:",error.message)
  }
  if(data.quotes.length === 0){
      return <h1>No  quotes available</h1>
  }
  let i =0;
  return (
   
    <div className='container my-container'>
      {
        
        data.quotes.map(quote=>{
          return(
            <blockquote key={i++}>
            <h6> {quote.name} </h6>
            <Link to={`/profile/${quote.by._id}`} className='right-align '>~{quote.by.firstName}</Link>
           
           </blockquote>
          
          )
        })
      }
       
        
    </div>
  )
}
