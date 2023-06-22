import { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import moment from 'moment'
import Comments from './Comments';
import { getPost } from '../../actions/posts';
import { postDetailStyles } from '../../styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector( state => state.posts );
  const { id } = useParams();
  const classes = postDetailStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect( () => {
    dispatch( getPost( id ) );
  }, [ id, dispatch, location ] );

  if ( !post ) return null;

  const recommendPosts = posts.filter( ( { _id } ) => _id !== post._id );

  if ( isLoading ) {
    return (
      <Paper elevation={ 6 } className={ classes.loadingPaper }>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
    <Paper
      elevation={ 6 }
      style={ { padding: "20px", borderRadisu: "15px" } }
    >
      <div className={ classes.card }>
        <div className={ classes.section }>
          <Typography component="h2" variant="h3">
            { post.title }
          </Typography>

          <Typography
            component="h2"
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            { post.tags.map( tag => (
              <Link
                key={ tag }
                to={ `/tags/${ tag }` }
                style={ { textDecoration: "none", color: "#3f51b5" } }
              >
                { ` #${ tag }` }
              </Link>
            ) ) }
          </Typography>

          <Typography
            component="p"
            variant="body1"
            gutterBottom
          >
            { post.message }
          </Typography>

          <Typography variant="h6">
            Created by:
            <Link
              to={ `/creators/${ post.name }` }
              style={ { textDecoration: "none", color: "#3f51b5" } }
            >
              { ` ${ post.name }` }
            </Link>
          </Typography>

          <Typography variant="body1">
            { moment( post.createdAt ).fromNow() }
          </Typography>

          <Divider style={ { margin: "20px 0" } } />

          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>

          <Divider style={ { margin: "20px 0" } } />

          <Comments post={ post } />

          <Divider style={ { margin: "20px 0" } } />
        </div>

        <div className={ classes.imageSection }>
          <img
            src={ post.selectedFile || import.meta.env.VITE_POST_DEFAULT_IMG }
            alt={ post.title }
            className={ classes.media }
          />
        </div>
      </div>

      { !!recommendPosts.length && (
        <div className={ classes.section }>
          <Typography variant="h5" gutterBottom>
            You might also like:
          </Typography>

          <Divider />

          <div className={ classes.recommendedPosts }>
            { recommendPosts.map( ( { _id, name, title, message, selectedFile, likes } ) => (
              <div
                key={ _id }
                style={ { margin: "20px", cursor: "pointer" } }
                onClick={ () => navigate( `/posts/${ _id }` ) }
              >
                <Typography variant="h6" gutterBottom>{ title }</Typography>
                <Typography variant="subtitle2" gutterBottom>{ name }</Typography>
                <Typography variant="subtitle2" gutterBottom>{ message }</Typography>
                <Typography variant="subtitle1" gutterBottom>Likes: { likes.length }</Typography>
                <img src={ selectedFile } width="200px" />
              </div>
            ) ) }
          </div>
        </div>
      ) }
    </Paper>
  );
};

export default PostDetails;
