const { ApolloServer } = require('apollo-server')
const { PubSub } =  require('graphql-subscriptions');

const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')


const pubsub = new PubSub()

const PORT = process.env.port || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
})

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(()=>{
        console.log('mongoDB connected')
        return server.listen({port: PORT })
    }).then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catcha(err =>{
        console.error(err)
    }) 