import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
query GetPosts {
  posts: getPosts {
    id
    body
    createdAt
    username
    comments {
      id
      createdAt
      body
      username
    }
    likes {
      id
      username
      createdAt
    }
    likeCount
    commentCount
  }
}
`;