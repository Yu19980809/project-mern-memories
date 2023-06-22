import { useEffect } from 'react';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import Post from './posts/Post';
import { searchPosts, searchPostsByCreator } from '../actions/posts';

const CreatorOrTag = () => {
  const { posts, isLoading } = useSelector( state => state.posts );
  const { name } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect( () => {
    if ( location.pathname.startsWith( '/tags' ) ) {
      dispatch( searchPosts( { tags: name } ) );
    } else {
      dispatch( searchPostsByCreator( name ) );
    }
  }, [ location, dispatch, name ] );

  return (
    <div>
      <Typography variant="h2">{ name }</Typography>
      <Divider style={ { margin: "20px 0 50px 0" } } />

      { isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={ 3 }>
          { posts?.map( post => (
            <Grid
              key={ post._id }
              item
              xs={ 12 }
              sm={ 12 }
              md={ 6 }
              lg={ 3 }
            >
              <Post post={ post } />
            </Grid>
          ) ) }
        </Grid>
      ) }
    </div>
  );
};

export default CreatorOrTag;
