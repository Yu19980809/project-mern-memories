import { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import { postDetailStyles } from '../../styles';

const Comments = ( { post } ) => {
  const user = JSON.parse( localStorage.getItem( 'profile' ) );
  const classes = postDetailStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const [ comment, setComment ] = useState( '' );
  const [ comments, setComments ] = useState( post.comments );

  const handleComment = async () => {
    const newComments = await dispatch( commentPost( `${ user?.result.name }: ${ comment }`, post._id ) );

    console.log( 'newComments', newComments );
    setComment( '' );
    setComments( newComments );
  };

  return (
    <div>
      <div className={ classes.commentsOuterContainer }>
        <div className={ classes.commentsInnerContainer }>
          <Typography variant="h6" gutterBottom>Comments</Typography>

          { comments?.map( ( comment, index ) => (
            <Typography key={ index } variant="subtitle1" gutterBottom>
              <strong>{ comment.split( ': ' )[0] }:&nbsp;</strong>
              { comment.split( ': ' )[1] }
            </Typography>
          ) ) }

          <div ref={ commentsRef } />
        </div>

        <div style={ { width: "60%" } }>
          <Typography variant="h6" gutterBottom>
            Write a comment
          </Typography>

          <TextField
            variant="outlined"
            label="Comment"
            value={ comment }
            multiline
            minrows={ 4 }
            fullWidth
            onChange={ e => setComment( e.target.value ) }
          />

          <br />

          <Button
            variant="contained"
            color="primary"
            disabled={ !comment.length }
            style={ { marginTop: "10px" } }
            fullWidth
            onClick={ handleComment }
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Comments