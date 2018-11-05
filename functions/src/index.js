import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { https } from 'firebase-functions';
import { graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const app = express();
app.use(cors());

app.get('/.well-known/apollo/server-health', (_, res) => res.type('application/health+json').send({ status: 'pass' }));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  })
);

export const api = https.onRequest(app);
