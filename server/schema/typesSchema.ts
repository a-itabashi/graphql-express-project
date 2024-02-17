import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';

// Scalar Type
/*
  String
  int
  Float
  Boolean
  ID
*/

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Represents a Person Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },
    // justAType: {
    //   type: Person,
    //   resolve(parent, _args) {
    //     return parent;
    //   },
    // },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    person: {
      type: Person,
      // args: { id: { type: GraphQLString } },
      resolve(_parent, _args) {
        const personObj = {
          // id: { type: GraphQLID },
          name: 'test',
          age: 34,
          isMarried: true,
          gpa: 4.0,
        };
        return personObj;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
