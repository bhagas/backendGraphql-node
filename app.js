import  express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
  } from 'apollo-server-core';
  import http from 'http';
const app = express()
const httpServer = http.createServer(app);
const port = 8080

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('hallo')
})

import { application } from './config/graphqlmerge.js';
  const schema = application.createSchemaForApollo();
async function startServer() {

    const server = new ApolloServer({
      schema,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
    await server.start();
    server.applyMiddleware({ app, path: '/gpl', bodyParserConfig: { limit: '50mb' }});
    await new Promise(resolve => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server berjalan di http://localhost:${port}${server.graphqlPath}`);
  }

export {app, startServer}
// app.use((err, req, res, next)=>{
//     res.json({pesan:'ada error', error: err})
// })

