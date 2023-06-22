import { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likePost, deletePost } from '../../actions/posts';
import { postStyles } from '../../styles';

const Post = ( { post, setCurrentPostId } ) => {
  const user = JSON.parse( localStorage.getItem( 'profile' ) );
  const userId = user?.result.googleId || user?.result._id;
  const hasLikedPost = post.likes.includes( userId );
  const classes = postStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ likes, setLikes ] = useState( post?.likes );

  const handleEdit = e => {
    e.stopPropagation();
    setCurrentPostId( post._id );
  };

  const handleLike = async () => {
    dispatch( likePost( post._id ) );

    hasLikedPost ? setLikes( post.likes.filter( id => id !== userId ) ) : setLikes( [ ...post.likes, userId ] )
  };

  const openPost = () => navigate( `/posts/${ post._id }` );

  const Likes = () => {
    if ( !likes.length ) return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>

    const len = likes.length;
    return likes.includes( userId ) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;{ len > 2 ? `You and ${ len - 1 } others` : `${ len } Like${ len > 1 ? 's' : '' }` }
      </>
    ) : (
      <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;{ len } Like{ len === 1 ? '' : 's' }
      </>
    )
  };

  return (
    <Card className={ classes.card }>
      <ButtonBase
        component="span"
        className={ classes.cardAction }
        onClick={ openPost }
      >
        <CardMedia
          image={ post.selectedFile || import.meta.env.VITE_POST_DEFAULT_IMG }
          title={ post.title }
          className={ classes.media }
        />

        <div className={ classes.overlay }>
          <Typography variant="h6">{ post.name }</Typography>
          <Typography variant="body2">{ moment( post.createdAt ).fromNow() }</Typography>
        </div>

        { userId === post?.creator && (
          <div className={ classes.overlay2 }>
            <Button
              size="small"
              style={ { color: "white" } }
              onClick={ handleEdit }
            >
              <MoreHorizIcon fontSize="small" />
            </Button>
          </div>
        ) }

        <div className={ classes.details }>
          <Typography
            component="h2"
            variant="body2"
            color="textSecondary"
          >
            { post.tags.map( tag => `#${ tag } ` ) }
          </Typography>
        </div>

        <Typography
          component="h2"
          variant="h5"
          gutterBottom
          className={ classes.title }
        >
          { post.title }
        </Typography>

        <CardContent>
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
          >
            { post.message }
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={ classes.cardActions }>
        <Button
          size="small"
          color="primary"
          onClick={ handleLike }
        >
          <Likes />
        </Button>

        { userId === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={ () => dispatch( deletePost( post?._id ) ) }
          >
            <DeleteIcon fontSize="small" />Delete
          </Button>
        ) }
      </CardActions>
    </Card>
  )
}

export default Post