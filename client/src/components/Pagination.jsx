import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import { paginationStyles } from '../styles';

const Paginate = ( { page } ) => {
  const { numberOfPages } = useSelector( state => state.posts );
  const classes = paginationStyles();
  const dispatch = useDispatch();

  useEffect( () => {
    if ( page ) dispatch( getPosts( page ) );
  }, [ dispatch, page ] );

  return (
    <Pagination
      variant="outlined"
      count={ numberOfPages }
      page={ Number( page ) || 1 }
      color="primary"
      classes={ { ul: classes.ul } }
      renderItem={ item => (
        <PaginationItem
          component={ Link }
          to={ `/posts?page=${ item.page }` }
          { ...item }
        />
      ) }
    />
  )
}

export default Paginate