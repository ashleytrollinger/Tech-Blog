const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        //const { postId, comment } = req.body; // Extract post ID and comment from the request body
        const comment = req.body.comment;
        const postId = req.body.post_id;
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(req.body);
        // Use the extracted post ID to associate the comment with the post
        const newComment = await Comment.create({
            comment,
            user_id: req.session.user_id,
            post_id: postId, // Use the post ID from the request body
        });
        console.log(postId);
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;

