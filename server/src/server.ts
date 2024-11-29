import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';



import connection from './config/connection.js';

import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import { authenticate } from './services/auth.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3333;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

connection.once('open', async () => {
  await server.start();


  app.use(
    '/graphql',
    express.json(),

    cookieParser(),
    expressMiddleware(server, {

      context: authenticate
    }),
  );


  if (process.env.PORT) {
  
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    })
  }

  app.listen(PORT, () => {
    console.log('Express server started on', PORT);
  });
});