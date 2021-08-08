import { Resolvers } from "__generated__/graphql";

const fakeUserID = 1;

export const resolvers: Resolvers = {
  Query: {
    AllPosts: async (_, { userId }, context) => {
      console.log("TEST!!");

      const res = await context.prisma.post.findMany({ where: { userId } });

      return res;
    },
  },
  Mutation: {
    AddPost: async (_, args, context) =>
      await context.prisma.post.create({
        data: {
          body: args.body,
          user: {
            connect: {
              id: fakeUserID,
            },
          },
        },
      }),
    LikePost: async (_, args, context) => {
      const like = await context.prisma.like.create({
        data: {
          post: {
            connect: {
              id: args.postId,
            },
          },
          user: {
            connect: {
              id: fakeUserID,
            },
          },
        },
        include: {
          post: true,
        },
      });

      return like.post;
    },
  },
};
