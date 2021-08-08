import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    post: [Post!]
    like: [Like!]
  }

  type Post {
    id: ID!
    user: User!
    userId: Int
    like: [Like]
  }

  type Like {
    id: ID!
    post: Post
    postId: Int
    user: User
    userId: Int
  }

  type Query {
    AllPosts: [Post!]!
  }

  type Mutation {
    AddPost(body: String!): Post!
    LikePost(postId: Int!): Post!
  }
`;
