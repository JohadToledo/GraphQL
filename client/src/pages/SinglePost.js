import { useMutation, useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, Grid, Icon, Image, Label } from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import MyPopup from "../util/MyPopup";

export function withRouter(Children) {
    return (props) => {
      const match = { params: useParams() };
      return <Children {...props} match={match} />
    }
  }

 function SinglePost(props) {
    const navigate = useNavigate();

  const postId = props.match.params.id;

  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null)
  
  const [comment, setComment] = useState('')

  const {
      data ={}
    } 
  = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
    update(){
       setComment('')
       commentInputRef.current.blur()
    },
    variables:{
      postId,
      body: comment
    }
  })

  function deletePostCallback(){
    navigate("/");
  }


  let postMarkup;
  if (!data.getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      commentCount,
      likeCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
              <MyPopup content='Like on this commet'><LikeButton user={user} post={{ id, likeCount, likes }} /></MyPopup>
              <MyPopup
              content='Comment on post'>
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("commented")}
              >
                <Button basic color="blue">
                  <Icon name="comment" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              </MyPopup>
                {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback}/>
                )} 
              </Card.Content>
            </Card>
            {user && (<Card fluid >
              <Card.Content>
              <p>Post a Comment</p>
              <Form>
                <div className="ui action input fluid">
                  <input
                    type='text'
                    placeholder="Comment.."
                    name='comment'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    ref={commentInputRef}/>
                    <button type='submit'
                      className="ui button teal"
                      disabled={comment.trim() === ''}
                      onClick={submitComment}
                      >
                      Submit
                      </button>
                </div>
              </Form>
              </Card.Content>
              </Card>)}
            {comments.map(comment=>(
              <Card fluid key={comment.id}>
               <Card.Content>
               { user && user.username === comment.username && (
                 <DeleteButton postId={id} commentId={comment.id}/>
               )}
               <Card.Header>{comment.username}</Card.Header>
               <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
               <Card.Description>{comment.body}</Card.Description>
               </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}
const SUBMIT_COMMENT_MUTATION= gql`
mutation($postId: String!, $body: String!){
  createComment(postId: $postId, body: $body){
    id
    comments{
      id body createdAt username
    }
    commentCount

  }
}`
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default withRouter(SinglePost)