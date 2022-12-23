
import { Context } from "./context";
import { DateTimeResolver } from "graphql-scalars";

export default {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany() //o context esta instanciando o prisma detro da prop prisma
    },
    postById: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id }
      })
    },
    feed: (
      _parent,
      args: {
        searchString: string | undefined;
        skip: number | undefined;
        take: number | undefined;
      },
      context: Context
    ) => {
      return context.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString as string } },
            { content: { contains: args.searchString as string } },
          ]
        },
        skip: args.skip,
        take: args.take
      })
    },
    draftsByUser: (_parent, args: { id: number }, context: Context) => {
      console.log(args)
      return context.prisma.user.findUnique({
        where: { id: args.id }
      }).post({ where: { published: false } })
    },
  },
  Mutation: {
    signupUser: (
      _parent,
      args: { name: string | undefined; email: string },
      context: Context
    ) => {
      console.log(args)
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email
        }
      })
    },
    createDraft: (
      _parent,
      args: { title: string; content: string | undefined; authorEmail: string },
      context: Context
    ) => {

      return context.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          author: {
            connect: {
              email: args.authorEmail
            }
          }
        }
      })
    },
    incrementPostViewCount: (
      _parent,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.post.update({
        where: { id: args.id },
        data: {
          viewCount: {
            increment: 1
          }
        }
      })
    },
    deletePost: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.delete({
        where: { id: args.id }
      })
    },
  },
  Post: {
    author: (parent, _args, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: parent.authorId }
      })
    },
  },
  User: {
    post: (parent, _args, context: Context) => {
      console.log(parent)

      return context.prisma.post.findMany({
        where: {
          authorId: parent.id
        }
      });
    },
  },
  DateTime: DateTimeResolver,
}