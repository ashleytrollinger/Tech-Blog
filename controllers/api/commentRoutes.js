const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Make a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Post.create({
            ...req.body,
            // [{
            //   "comment": ""
            // }]
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});