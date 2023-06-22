import mongoose, { isValidObjectId } from 'mongoose';
import Post from '../models/post.js';

const checkId = ( id, res ) => {
  if ( !mongoose.Types.ObjectId.isValid( id ) ) {
    return res.status( 400 ).send( 'Not a valid id' );
  }
};

const getPosts = async ( req, res ) => {
  const { page } = req.query;

  try {
    const LIMIT = 2;
    const startIndex = ( Number( page ) - 1 ) * LIMIT;
    const total = await Post.countDocuments( {} );
    const posts = await Post.find().sort( { createdAt: -1 } ).skip( startIndex ).limit( LIMIT );
    res.status( 200 ).json( { success: true, data: posts, currentPage: Number( page ), numberOfPages: Math.ceil( total / LIMIT ) } );
  } catch (error) {
    res.status( 500 ).send( error );
  }
};

const getPost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id, res );

  try {
    const post = await Post.findById( id );
    res.status( 200 ).json( { success: true, data: post } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

const createPost = async ( req, res ) => {
  const { name, title, message, tags, selectedFile } = req.body;

  try {
    const newPost = await Post.create( { name, title, message, tags, selectedFile, creator: req.userId } );
    res.status( 201 ).json( { success: true, data: newPost } );
  } catch (error) {
    res.status( 500 ).send( error );
  }
};

const updatePost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id, res );

  const { name, title, message, tags, selectedFile } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate( id, { name, title, message, tags, selectedFile }, { new: true } );
    res.status( 200 ).json( { success: true, data: updatedPost } );
  } catch (error) {
    res.status( 500 ).send( error );
  }
};

const likePost = async ( req, res ) => {
  if ( !req.userId ) res.status( 401 ).json( { message: 'Unauthenticated' } );

  const { id } = req.params;
  checkId( id, res );

  try {
    const post = await Post.findById( id );
    const index = post.likes.findIndex( id => id === String( req.userId ) );
    if ( index === -1 ) {
      post.likes.push( req.userId );
    } else {
      post.likes = post.likes.filter( id => id !== String( req.userId ) );
    }

    const updatedPost = await Post.findByIdAndUpdate( id, post, { new: true } );
    res.status( 200 ).json( { success: true, data: updatedPost } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

const deletePost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id, res );

  try {
    await Post.findByIdAndDelete( id );
    res.status( 200 ).json( { success: true, message: 'Post deleted successfully' } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

const searchPosts = async ( req, res ) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp( searchQuery, 'i' );
    const posts = await Post.find( { $or: [ { title }, { tags: { $in: tags.split( ',' ) } } ] } );
    res.status( 200 ).json( { success: true, data: posts } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

const commentPost = async ( req, res ) => {
  const { id } = req.params;
  checkId( id, res );
  const { comment } = req.body;

  try {
    const post = await Post.findById( id );
    post.comments.unshift( comment );

    const updatedPost = await Post.findByIdAndUpdate( id, post, { new: true } );
    res.status( 200 ).json( { success: true, data: updatedPost } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

const getPostsByCreator = async ( req, res ) => {
  const { name } = req.query;

  try {
    const posts = await Post.find( { name } ).sort( { createdAt: -1 } );
    res.status( 200 ).json( { success: true, data: posts } );
  } catch (error) {
    res.status( 400 ).send( error );
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
  getPostsByCreator
};
