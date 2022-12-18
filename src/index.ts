import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { Context, context } from "./context";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { User } from "@prisma/client";

const typeDefs = `
type Query {
  allUsers: [User!]!
  postById(id: Int!): Post
  feed(searchString: String, skip: Int, take: Int): [Post!]!
  draftsByUser(id: Int!): [Post]
}

type Mutation {
  signupUser(name: String, email: String!): User!
  createDraft(title: String!, content: String, authorEmail: String): Post
  incrementPostViewCount(id: Int!): Post
  deletePost(id: Int!): Post
}

type User {
  id: Int!
  email: String!
  name: String
  posts: [Post!]!
}

type Post {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: String
  published: Boolean!
  viewCount: Int!
  author: User
}

scalar DateTime
`;

const resolvers = {
  Query: {
    allUsers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany({
        include: {
          post: true
        }
      })
    },
    postById: (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: {
          id: args.id
        }
      })
    },
    feed: (
      _parent: any,
      args: {
        searchString: string | undefined;
        skip: number | undefined;
        take: number | undefined;
      },
      context: Context
    ) => {
      // TODO
    },
    draftsByUser: (_parent: any, args: { id: number }, context: Context) => {
      // TODO
    },
  },
  Mutation: {
    signupUser: (
      _parent: any,
      args: { name: string | undefined; email: string },
      context: Context
    ) => {
      // TODO
    },
    createDraft: (
      _parent: any,
      args: { title: string; content: string | undefined; authorEmail: string },
      context: Context
    ) => {
      // TODO
    },
    incrementPostViewCount: (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      // TODO
    },
    deletePost: (_parent: any, args: { id: number }, context: Context) => {
      // TODO
    },
  },
  Post: {
    author: (parent: any, _args: any, context: Context) => {
      return null;
    },
  },
  User: {
    posts: (parent: User, _args: any, context: Context) => {
      return context.prisma.post.findMany({
        where: {
          authorId: parent.id
        }
      })
    },
  },
  DateTime: DateTimeResolver,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
server.listen({ port: 3002 }, () =>
  console.log(`🚀 Server ready at: http://localhost:3002`)
);