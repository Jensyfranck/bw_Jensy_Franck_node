const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET all comments for a post
router.get('/post/:postId', commentController.getAllCommentsForPost);

// Route to get all comments
router.get('/', commentController.getAllComments);

// GET a single comment by ID
router.get('/:commentId', commentController.getCommentById);

// POST a new comment to a post
router.post('/', commentController.createComment);

// PUT to update a comment by ID
router.put('/:commentId', commentController.updateComment);

// DELETE a comment by ID
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
