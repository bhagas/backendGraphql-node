const  express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const {buildSubgraphSchema} = require('@apollo/subgraph');
const path = require('path');
  const http = require('http');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const app = express()
  const jwt = require('../helper/jwt')
const httpServer = http.createServer(app);
  app.use(express.static(path.join(path.resolve(), 'dist')));
// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('hallo')
})

const startServer = async function() {

const schema  = require('../config/graphqlmerge.js');

  const server = new ApolloServer({
    schema:buildSubgraphSchema(schema),
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
  });
  await server.start();
  app.use(
    '/gql',
    cors(),
    expressMiddleware(server,
      {
        context: async ({ req }) => { 
          try {
            let user ='';
            let token = (req.headers.authorization)?req.headers.authorization:'';
            if(token){
              let dt = token.split(" ");
              user=await jwt.verify(dt[1]);
            }
            return {user};
          } catch (error) {
            return {user:''};
          }
        

      }
    }),
  );

 };

 startServer()
 app.use((err, req, res, next)=>{
  res.json({pesan:'error', error: err})
})
 module.exports= httpServer;