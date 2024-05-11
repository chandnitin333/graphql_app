
import {gql} from 'apollo-server-express'

const typeDefs = gql`
   type Query {
        users:[User]
        user(_id:ID!):User
        quotes:[QuoteWithName]
        iquote(by:ID!):[Quote]
        myprofile:User
    }
    type QuoteWithName{
        name:String
        by:IdName
    }
    type IdName {
        _id:String
        firstName:String
    }
    type User{
        _id:ID
        firstName:String
        lastName:String
        email:String
        password:String
        quotes:[Quote]  
    }
    type Quote{
        by:ID,
        name:String
    }
    type Token{
        token:String
    }
    type Mutation{
        signupUser(userNew:UserInput!): User
        signInUser(userSignin:userSignInInput!):Token
        createQuote(name:String!):String
        updateUser(data:userInfo!):User
    }

    input userInfo {
        firstName:String!
        lastName:String!
        email:String!
    }
    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }

    input userSignInInput{
        email:String!
        password:String!
    }
`

export default typeDefs;