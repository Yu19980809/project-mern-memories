import { FETCH_ALL, FETCH_POST, FETCH_BY_CREATOR, CREATE, UPDATE, LIKE, DELETE, SEARCH, COMMENT, START_LOADING, END_LOADING } from '../constants';

export default ( state = { isLoading: true, posts: [] }, action ) => {
  switch ( action.type ) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_POST:
    case FETCH_BY_CREATOR:
      return { ...state, post: action.payload }
    case CREATE:
      return { ...state, posts: [ ...state.posts, action.payload ] };
    case LIKE:
    case UPDATE:
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map( post => ( post._id === action.payload._id ) ? action.payload : post )
      };
    case DELETE:
      return { ...state, posts: state.posts.filter( post => post._id !== action.payload ) };
    case SEARCH:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
