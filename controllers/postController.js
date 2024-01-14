const dbConnection = require('../database');

const postController = {
    getAllPosts: (req, res) => {
        dbConnection.query('SELECT * FROM posts', (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.status(200).json(results);
        });
    },

    getPostsByLimitOffset: (req, res) => {
        const limit = parseInt(req.query.limit) || 10; // Default limit
        const offset = parseInt(req.query.offset) || 0; // Default offset

        const query = 'SELECT * FROM posts LIMIT ? OFFSET ?';
        dbConnection.query(query, [limit, offset], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json(results);
        });
    },

    createPost: (req, res) => {
        const { title, message, userId } = req.body;
        if (!title || !message || !userId) {
            return res.status(400).send('Title, message, and user ID are required');
        }

        const query = 'INSERT INTO posts (title, message, user_id) VALUES (?, ?, ?)';
        dbConnection.query(query, [title, message, userId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ message: 'Post created successfully', postId: results.insertId });
        });
    },

    updatePost: (req, res) => {
        const { postId } = req.params;
        const { title, message } = req.body;
        if (!title || !message) {
            return res.status(400).send('Title and message are required');
        }

        const query = 'UPDATE posts SET title = ?, message = ? WHERE id = ?';
        dbConnection.query(query, [title, message, postId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post updated successfully' });
        });
    },

    deletePost: (req, res) => {
        const { postId } = req.params;
        const query = 'DELETE FROM posts WHERE id = ?';

        dbConnection.query(query, [postId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        });
    },

    searchPosts: (req, res) => {
        const searchTerm = req.query.search;
        if (!searchTerm) {
            return res.status(400).send('Search term is required');
        }

        const query = 'SELECT * FROM posts WHERE title LIKE ? OR message LIKE ?';
        dbConnection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json(results);
        });
    },
};

module.exports = postController;
