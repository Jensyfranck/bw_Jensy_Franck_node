const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET all posts
router.get('/', postController.getAllPosts);

// GET a single post by ID
router.get('/by-limit-offset', postController.getPostsByLimitOffset);

// POST a new post
router.post('/', postController.createPost);

// PUT to update a post by ID
router.put('/:postId', postController.updatePost);

// DELETE a post by ID
router.delete('/:postId', postController.deletePost);

router.get('/search', postController.searchPosts);

module.exports = router;
