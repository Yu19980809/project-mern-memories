import { useState } from 'react';
import { Container,  Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { Posts, Form, Pagination } from './index';
import { homeStyles } from '../styles';

function useQuery() {
  return new URLSearchParams( useLocation().search );
}

const Home = () => {
  const classes = homeStyles();
  const query = useQuery();
  const page = query.get( 'page' ) || 1;
  const searchQuery = query.get( 'searchQuery' );
  const searchTags = query.get( 'tags' );

  const [ currentPostId, setCurrentPostId ] = useState( null );

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={ 3 }
        >
          <Grid item xs={ 12 } sm={ 7 }>
            <Posts setCurrentPostId={ setCurrentPostId } />
          </Grid>

          <Grid item xs={ 12 } sm={ 4 }>
            <Form currentPostId={ currentPostId } setCurrentPostId={ setCurrentPostId } />
          
            { ( !searchQuery && !searchTags ) && (
              <Paper elevation={ 6 } className={ classes.pagination }>
                <Pagination page={ page } />
              </Paper>
            ) }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
