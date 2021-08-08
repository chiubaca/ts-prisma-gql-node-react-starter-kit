import { Resolvers } from "__generated__/graphql";

const fakeUserID = 2;

export const resolvers = {
  Query: {
    AllPosts: async (_, args, context) => {
      const posts = await context.prisma.post.findMany();
      return posts;
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
