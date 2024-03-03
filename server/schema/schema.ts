import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import User from '../model/user';
import Post from '../model/post';
import Hobby from '../model/hobby';

// dummy data
const userData = [
  { id: '1', name: 'Bond', age: 36, profession: 'Programmer' },
  { id: '13', name: 'Anna', age: 26, profession: 'Baker' },
  { id: '211', name: 'Bella', age: 16, profession: 'Mechanic' },
  { id: '19', name: 'Gina', age: 26, profession: 'Painter' },
  { id: '150', name: 'Geogia', age: 36, profession: 'Doctor' },
];

const hobbyData = [
  {
    id: '1',
    title: 'Programmer',
    description: 'hoddy description 1',
    userId: '1',
  },
  { id: '2', title: 'Rowing', description: 'hoddy description 2', userId: '1' },
  {
    id: '3',
    title: 'Swimming',
    description: 'hoddy description 3',
    userId: '211',
  },
  {
    id: '4',
    title: 'Fencing',
    description: 'hoddy description 4',
    userId: '19',
  },
  {
    id: '5',
    title: 'Hiking',
    description: 'hoddy description 5',
    userId: '150',
  },
];

const postsData = [
  { id: '1', comment: 'Post comment 1', userId: '1' },
  { id: '2', comment: 'Post comment 2', userId: '1' },
  { id: '3', comment: 'Post comment 3', userId: '211' },
  { id: '3', comment: 'Post comment 3', userId: '19' },
  { id: '3', comment: 'Post comment 3', userId: '150' },
];

// Create Types
const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'Document for user...',
  fields: () => ({
    id: { type: GraphQLString },
    // id: {
    //   type: GraphQLInt,
    //   description: 'The User ID.',
    // },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postsData.filter((post) => post.userId === parent.id);
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, arrgs) {
        return hobbyData.filter((hobby) => hobby.userId === parent.id);
      },
    },
  }),
});

const HobbyType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby Description',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, _args) {
        return userData.find((user) => user.id === parent.userId);
      },
    },
  }),
});

const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, _args) {
        return userData.find((user) => user.id === parent.userId);
      },
    },
  }),
});

// RootQuery
/*
{
  User(id: 1){
    name
    age
    slibings{
      id
      name
      age
      hobby{
        title
      }
    }
  }
}
*/

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_parent, args) {
        // return _.find(userData, { id: args.id });
        return userData.find((user) => user.id === args.id);

        // we resolve with data
        // get and return data from datasource
        // const user = {
        //   id: '345',
        //   age: 34,
        //   name: 'Taro',
        // };
        // return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(_parent, _args) {
        return userData;
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return hobbyData.find((hobby) => hobby.id === args.id);
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(_parent, _args) {
        return hobbyData;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return postsData.find((post) => post.id === args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(_parent, _args) {
        return postsData;
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: {type : GraphQLID}
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      // resolve(_parent, args) {
      //   // const user = {
      //   //   name: args.name,
      //   //   age: args.age,
      //   //   profession: args.profession,
      //   // };
      resolve(_parent, args) {
        // ユーザーモデルを作成
        const user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        // ユーザーをデータベースに保存
        return user.save();
      },
    },
    createPost: {
      type: PostType,
      args: {
        // id: {type : GraphQLID}
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      // resolve(_parent, args) {
      //   const post = {
      //     comment: args.comment,
      //     userId: args.userId,
      //   };
      //   return post;
      // },
      resolve(_parent, args) {
        const post = new Post({
          comment: args.comment,
          userId: args.userId,
        });
        return post.save();
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        // id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      // resolve(_parent, args) {
      //   const hobby = {
      //     title: args.title,
      //     description: args.description,
      //     userId: args.userId,
      //   };
      //   return hobby;
      // },
      resolve(_parent, args) {
        const hobby = new Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId,
        });
        return hobby.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
