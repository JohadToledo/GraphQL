import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export default function Home() {
  const {  data } = useQuery(FETCH_POSTS_QUERY)

  if(data){
    console.log(data)
  }

  return (
    <div><h1>Home page </h1></div>
  )
}

const FETCH_POSTS_QUERY = gql`
  {  
    getPosts{
      id body createdAt username likeCount
      likes{
        usernmae
      }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`