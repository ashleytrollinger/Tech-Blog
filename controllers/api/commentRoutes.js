const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Make a comment
router.post('/', withAuth, async (req, res) => {
    console.log("WORKING!!!")
    try {
        const newComment = await Comment.create({
            ...req.body,
            // [{
            //   "comment": ""
            // }]
            user_id: req.session.user_id,
        },
            { isNewRecord: true }
        );
        console.log(newComment)
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

module.exports = router;