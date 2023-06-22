import express from 'express';
import auth from '../middleware/user.js';
import { getPosts, getPost, getPostsByCreator, createPost, updatePost, likePost, deletePost, searchPosts, commentPost } from '../controllers/posts.js';

const router = express.Router();

router.get( '/creator', getPostsByCreator );
router.get( '/search', searchPosts );
router.get( '/', getPosts );
router.get( '/:id', getPost );

router.post( '/', auth, createPost );
router.patch( '/:id', auth, updatePost );
router.delete( '/:id', auth, deletePost )
router.patch( '/:id/like', auth, likePost );
router.patch( '/:id/comment', auth, commentPost );

export default router;
