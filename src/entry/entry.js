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
    '/gpl',
    cors(),
    expressMiddleware(server),
  );

 };

 startServer()
 app.use((err, req, res, next)=>{
  res.json({pesan:'error', error: err})
})
 module.exports= httpServer;