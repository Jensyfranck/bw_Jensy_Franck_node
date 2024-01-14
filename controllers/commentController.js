const dbConnection = require('../database');

const commentController = {
    getAllCommentsForPost: (req, res) => {
        const { postId } = req.params;
        dbConnection.query('SELECT * FROM comments WHERE post_id = ?', [postId], (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.status(200).json(results);
        });
    },

    getAllComments: (req, res) => {
        const query = 'SELECT * FROM comments'; // SQL query to select all comments
        dbConnection.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results);
        });
    },

    getCommentById: (req, res) => {
        const { commentId } = req.params;
        dbConnection.query('SELECT * FROM comments WHERE id = ?', [commentId], (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.status(200).json(results[0
]);
});
},

createComment: (req, res) => {
    const { post_id, user_id, message } = req.body;

    // Basic validation
    if (!post_id || !user_id || !message) {
        return res.status(400).send('All fields are required');
    }

    // Insert the comment into the database
    const query = 'INSERT INTO comments (post_id, user_id, message) VALUES (?, ?, ?)';
    dbConnection.query(query, [post_id, user_id, message], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Comment created successfully', commentId: results.insertId });
    });
},

updateComment: (req, res) => {
    const { commentId } = req.params;
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Message is required');
    }

const query = 'UPDATE comments SET message = ? WHERE id = ?';
dbConnection.query(query, [message, commentId], (error, results) => {
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment updated successfully' });
});
},

deleteComment: (req, res) => {
    const { commentId } = req.params;
    const query = 'DELETE FROM comments WHERE id = ?';

    dbConnection.query(query, [commentId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    });
}
};

module.exports = commentController;