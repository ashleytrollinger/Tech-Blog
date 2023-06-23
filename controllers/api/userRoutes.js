const router = require('express').Router();
const { User } = require('../../models');

//Create an Account
router.post('/', async (req, res) => {

    try {
        console.log("before")
        console.log(req.body);
        const userData = await User.create(req.body);
        console.log("after" + req.body)
        req.session.save(() => {
            console.log("1");
            req.session.user_id = userData.id;
            console.log("2");
            req.session.logged_in = true;
            console.log("3");

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});
//Log into an Account
router.post('/login', async (req, res) => {

    try {
        //Checking the log in credentials 
        const userData = await User.findOne({ where: { username: req.body.username } });
        console.log(userData)
        if (!userData) {

            res.status(400).json({ message: 'Incorrect Log In credentials' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Log In credentials' });
            return;
        }
        //Saving the session 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
//Log out of Account
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(404).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;