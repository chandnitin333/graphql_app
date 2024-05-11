import {ApolloServer,gql} from 'apollo-server-express'
import {ApolloServerPluginLandingPageGraphQLPlayground,
        ApolloServerPluginDrainHttpServer,ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
if(process.env.NODE_ENV !=="production"){
    dotenv.config();
}

const app = express();
const httpServer = http.createServer(app);

const port =process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo Connected..")
})
// tag template literals


mongoose.connection.on("error",(err)=>{
    console.log("Mongo Connection Failed",err)
})
//import  models
import  './src/models/Quotes.js'
import  './src/models/User.js'

import typeDefs from './src/schemas/schemaGql.js';
import resolvers from './src/resolvers/resolvers.js'

const context = ({req})=>{
    const {authorization} =  req.headers
    
    if(authorization){
        const {userId}=  jwt.verify(authorization,process.env.JWT_SECRETE)
        
        return {userId}
    }
 }
const server =  new  ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground(),

        process.env.NODE_ENV !=="production" ? 
            ApolloServerPluginDrainHttpServer({ httpServer }) 
            : ApolloServerPluginLandingPageDisabled()
    ]
})

app.get("/",(req,res)=>{
    res.send("Boom!!!!")
})
await server.start();

server.applyMiddleware({
    app,
    path:'/graphql'
})

httpServer.listen({ port }, ()=>{
    console.log(`🚀  Server ready at: ${port} ${server.graphqlPath}`);
});
