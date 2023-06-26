import  express from'express';
import { ApolloServer } from'@apollo/server';
import { expressMiddleware } from'@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from'@apollo/server/plugin/drainHttpServer';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import {buildSubgraphSchema} from '@apollo/subgraph';
import skema from "./config/graphqlmerge.js";
import path from'path';
import http from'http';
import cors from'cors';
import bodyParser from'body-parser';
let port = process.env.PORT || 3000;
  const app = express()
const httpServer = http.createServer(app);
  app.use(express.static(path.join(path.resolve(), 'assets')));
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json


  const server = new ApolloServer({
    schema: buildSubgraphSchema(skema),
    cache: 'bounded',
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
  });

  await server.start();

  app.use(cors())
  app.use(bodyParser.json());
  app.use( graphqlUploadExpress());
  app.use(
    '/gpl',

    // cors(),
    expressMiddleware(server,
      {
        context: async ({ req }) => { 
          
          let token = (req.headers.token)?req.headers.token:'';
          return {token};

      }
        
          
      }),
  );

//   app.get('/',(req,res)=>{
//     res.send('hallo')
// })
 app.use((err, req, res, next)=>{
  res.json({pesan:'error', error: err})
})

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//untuk testing
export default httpServer;