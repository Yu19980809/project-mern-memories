import * as api from '../api';
import { FETCH_ALL, FETCH_POST, FETCH_BY_CREATOR, CREATE, UPDATE, LIKE, DELETE, SEARCH, COMMENT, START_LOADING, END_LOADING } from '../constants';

const getPosts = page => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data } = await api.getPosts( page );
    dispatch( { type: FETCH_ALL, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
};

const createPost = ( postData, navigate ) => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data: { data } } = await api.createPost( postData );
    dispatch( { type: CREATE, payload: data } );
    navigate( `/posts/${ data._id }` );
  } catch (error) {
    console.log( error );
  }
};

const updatePost = ( postId, updateData ) => async ( dispatch ) => {
  try {
    const { data: { data } } = await api.updatePost( postId, updateData );
    dispatch( { type: UPDATE, payload: data } );
  } catch (error) {
    console.log( error );
  }
};

const likePost = postId => async ( dispatch ) => {
  try {
    const { data: { data } } = await api.likePost( postId );
    dispatch( { type: LIKE, payload: data } );
  } catch (error) {
    console.log( error );
  }
};

const deletePost = postId => async ( dispatch ) => {
  try {
    await api.deletePost( postId );
    dispatch( { type: DELETE, payload: postId } );
  } catch (error) {
    console.log( error );
  }
};

const searchPosts = searchQuery => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data: { data } } = await api.searchPosts( searchQuery );
    dispatch( { type: SEARCH, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
};

const getPost = postId => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data: { data } } = await api.getPost( postId );
    dispatch( { type: FETCH_POST, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
};

const commentPost = ( comment, postId ) => async ( dispatch ) => {
  try {
    const { data: { data } } = await api.commentPost( comment, postId );
    dispatch( { type: COMMENT, payload: data } );
    console.log( 'commentPost', data );
    return data.comments;
  } catch (error) {
    console.log( error );
  }
};

const searchPostsByCreator = name => async ( dispatch ) => {
  try {
    dispatch( { type: START_LOADING } );
    const { data: { data } } = await api.getPostsByCreator( name );
    dispatch( { type: FETCH_BY_CREATOR, payload: data } );
    dispatch( { type: END_LOADING } );
  } catch (error) {
    console.log( error );
  }
};

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  searchPosts,
  commentPost,
  searchPostsByCreator
};
