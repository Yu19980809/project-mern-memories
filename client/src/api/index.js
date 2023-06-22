import axios from 'axios';

const API = axios.create( { baseURL: 'http://localhost:4000/api/v1' } );

API.interceptors.request.use( req => {
  const userData = localStorage.getItem( 'profile' );
  if ( userData ) {
    req.headers.Authorization = `Bearer ${ JSON.parse( userData ).token }`;
  }

  return req;
} );

const getPosts = page => API.get( `/posts?page=${ page }` );
const getPost = postId => API.get( `/posts/${ postId }` );
const getPostsByCreator = name => API.get( `/posts/creator?name=${ name }` );
const createPost = postData => API.post( '/posts', postData );
const updatePost = ( postId, updateData ) => API.patch( `/posts/${ postId }`, updateData );
const likePost = ( postId ) => API.patch( `/posts/${ postId }/like` );
const deletePost = postId => API.delete( `/posts/${ postId }` );
const searchPosts = searchQuery => API.get( `/posts/search?searchQuery=${ searchQuery.search || 'none' }&tags=${ searchQuery.tags }` );
const commentPost = ( comment, postId ) => API.patch( `/posts/${ postId }/comment`, { comment } );

const signIn = userData => API.post( '/user/signin', userData );
const signUp = userData => API.post( '/user/signup', userData );

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  searchPosts,
  commentPost,
  getPostsByCreator,
  signIn,
  signUp
};
