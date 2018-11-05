import bodyParser from 'body-parser';
import express from 'express';
import { https } from 'firebase-functions';
import { graphqlExpress } from 'graphql-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const graphql = https.onRequest(
  express().use(
    bodyParser.json(),
    graphqlExpress({
      typeDefs,
      resolvers,
    })
  )
);
