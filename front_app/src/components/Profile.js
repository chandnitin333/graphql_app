import { useQuery } from "@apollo/client"
import { GET_MY_PROFILE } from "../gqloperation/queries"
import { useNavigate } from "react-router-dom"


export default function Profile() {
  const{loading,error,data} =  useQuery(GET_MY_PROFILE)
  const navigate = useNavigate()
  if(!localStorage.getItem("token")){
    navigate("/login")
    return <h1>Unauthorized</h1>
  }
  if(error){
    console.log("Profile error::", error)
  }
  
  if(loading) return <h1>Loading...</h1>
  let unique =0
  return (
    <div className='container my-container'>
       <div className='center-align'>
        <img className="circle" style={{border:"2px solid" ,marginTop:"10px"}} src={`https://robohash.org/${data.user.fistName}.png?size=200x200`} alt='pic' />
        
        <h5>{data.user.firstName} {data.user.lastName} </h5>
        <h6>Email: {data.user.email }</h6>
        
       </div>
       <h3>Your Quotes</h3>
       {
        
        data.user.quotes.map(quot=>{
          return(
            <blockquote key={unique++}>
            <h6> {quot.name} </h6>
           
           </blockquote>
          )
        })
       }
      
        
    </div>
  )
}
