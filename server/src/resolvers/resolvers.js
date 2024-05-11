
import mongoose from "mongoose"
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";


const User = mongoose.model("User")
const Quote = mongoose.model("Quotes")

const resolvers = {
    Query:{
        users : async() =>await User.find({}),
        user: async(_,{_id})=> await User.findOne({_id}) ,//users.find(user=>user._id == args._id),
        quotes : async () => await Quote.find({}).populate("by","_id firstName"),
        iquote : async (_,user) =>await Quote.find({by:user.by}), //{ const qt =   await Quote.find({by:user.by}); console.log("qt==",qt); return {'qt':qt[0]}},
        myprofile: async(_,args,{userId})=>{
            if(!userId)  throw new Error("You must be login.")
            return await User.findOne({_id:userId})
        }
    },
    User:{
        quotes: async (ur)=> await Quote.find({by:ur._id})   //quotes.filter(quotes=>quotes.by == ur._id)
    },
    Mutation:{
        signupUser: async (_,{userNew})=>{
            const user =await  User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists with that email")
            }
            let hashPassword = await  bcrypt.hash(userNew.password,12)
            console.log({
                ...userNew,
                password:hashPassword
            })
           const newUser =  new User({
                ...userNew,
                password:hashPassword
            })

            return await newUser.save()
        },
        signInUser: async (_,{userSignin})=>{
            //
           const user = await User.findOne({email:userSignin.email})
           if(!user){
             throw new Error("User does not exists with that email")
           }
           const doMatch = await bcrypt.compare(userSignin.password,user.password)
           console.log("doMatch",doMatch)
           if(!doMatch){
            throw new Error("email or password invalid password..!")
           }
           
           const token = jwt.sign({userId:user._id},process.env.JWT_SECRETE)
          
           return{  token }

        },
        createQuote: async (_,{name},{userId})=>{ // third context
            if(!userId)  throw new Error("You must be login.")
            const newQuote = new  Quote({
                name,
                by:userId
            })
            await newQuote.save()
            return "Quote saved successfully"
        },

        updateUser: async (_,{data},{userId}) =>{
            if(!userId)  throw new Error("You must be login.")
            const user = await User.findOne({_id:userId})
            if(!user){
                throw new Error("User does not exists")
            }
            
            const updateInfo = await User.findByIdAndUpdate({_id:userId},{data});
            return updateInfo
        }

    },


}

export default resolvers