import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './server/schema/schema';
import testSchema from './server/schema/typesSchema';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';

const uri = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPassword}@graphqlcluster.i2yxeng.mongodb.net/?retryWrites=true&w=majority&appName=graphqlCluster`;

const app = express();
app.use(cors());

mongoose.connect(uri);
mongoose.connection.once('open', () => {
  console.log('Yes!  We are connected!');
});

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    // schema: testSchema,
  })
);

app.listen(4000, () => {
  console.log('Listening for requests on my awesome port 4000');
});
