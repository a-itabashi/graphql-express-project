import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './server/schema/schema';
import testSchema from './server/schema/typesSchema';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPassword}@graphqlcluster.i2yxeng.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    // schema: schema
    schema: testSchema,
  })
);

client
  .connect()
  .then(() => {
    app.listen(4000, () => {
      console.log('Listen for 4000 port');
    });
  })
  .catch((e) => console.log(e));

// app.listen(4000, () => {
//   console.log('Listen for 4000 port');
// });
