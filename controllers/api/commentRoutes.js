const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Make a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const { post_id, comment } = req.body;

        const newComment = await Comment.create({
            comment: comment,
            user_id: req.session.user_id,
            post_id: post_id, // Include the post_id association
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;