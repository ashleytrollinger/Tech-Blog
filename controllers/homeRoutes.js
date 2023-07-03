const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/homepage', async (req, res) => {

    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postID = req.params.id;
        const postData = await Post.findByPk(postID, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        const commentData = await Comment.findAll({
            where: {
                post_id: postID,
            },
            include: [

                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        const post = postData.get({ plain: true });
        const comments = commentData.map(comment => comment.get({ plain: true }));
        console.log("homeroutes " + post.id);
        console.log(comments)
        res.render('post', {
            // title: post.title,
            // user_id: post.user.username,
            // postId: post.id,
            // date: post.date,
            // content: post.content,
            comments: comments,
            post: post,

        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post,
                attributes: ['title', 'content', 'date']
            }],
        });

        const user = userData.get({ plain: true });
        console.log(user);
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})

module.exports = router;