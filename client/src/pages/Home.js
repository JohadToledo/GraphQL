import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
   query GetPosts{
  posts: getPosts{
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
  `

 export default function Home() {
  
  // const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
  // if(data) {
  //   console.log(data);
  //   const { getPosts: posts } = data;
  // }
  // if(error) {
  //   console.log(error);
  //   return "error"; // blocks rendering
  // }

  // const {
  //   loading,
  //    data: { getPosts: posts }
  //   }  = useQuery(FETCH_POSTS_QUERY);
    
    const { loading, data, data: { posts } = {} } = useQuery(FETCH_POSTS_QUERY);


  // {loading && <h1>Loading posts...</h1>}
  // {data && (
  //  <Transition.Group>
  //    {posts &&
  //     posts.map((post) => (
  //       <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
  //         <PostCard post={post} />
  //       </Grid.Column>
  //     ))}
  // </Transition.Group>
  // )}


  return (
    <Grid columns={3}>
    <Grid.Row className='page-title'>
      <h1>Recent Posts</h1>
    </Grid.Row>
    <Grid.Row>
    {loading ? 
  (
    <h1>Loading posts...</h1>
  ):(
    posts && 
    posts.map(post =>(
      <Grid.Column key={post.id} style={{marginBottom: 20}}>
        <PostCard post={post} />
      </Grid.Column>
    ))
  )}
    </Grid.Row>
    </Grid>
  )
}
