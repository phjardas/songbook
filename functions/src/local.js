import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers-local';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const app = express();
app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

const port = parseInt(process.env.PORT || '3001');
app.listen({ port }, () => {
  console.log(`GraphQL server ready at http://localhost:${port}/graphql`);
  console.log(`GraphQL playground ready at http://localhost:${port}/graphiql`);
});
