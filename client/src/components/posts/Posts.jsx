import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post';
import { postsStyles } from '../../styles';

const Posts = ( { setCurrentPostId } ) => {
  const { isLoading, posts } = useSelector( state => state.posts );
  const classes = postsStyles();

  return (
    isLoading ? <CircularProgress /> : (
      <Grid
        container
        alignItems="stretch"
        spacing={ 3 }
        className={ classes.container }
      >
        { posts.map( post => (
          <Grid key={ post._id } item xs={ 12 } sm={ 6 } md={ 6 }>
            <Post post={ post } setCurrentPostId={ setCurrentPostId } />
          </Grid>
        ) ) }
      </Grid>
    )
  )
}

export default Posts