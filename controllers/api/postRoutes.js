const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//Make a post
router.post('/', withAuth, async (req, res) => {
    console.log('working');
    try {
        const newPost = await Post.create({
            ...req.body,
            // [{
            //   "title": "",
            //   "content": ""
            // }]
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});
//Delete a post
router.delete('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.seession.user_id,
            },
        });
        if (!projectData) {
            res.status(404).json({ message: 'No project found to delete.' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Update a post
router.put('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No project found to update' })
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;