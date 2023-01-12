// homeroutes contains all the view routes that do not require any authentication
const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// TODO - work on GET route for getting all posts
// this page can be viewed without logging in
router.get("/", async (req, res) => {
    let username;
    if (req.session.loggedIn) {
        // username = req.session.username;
    }

    // TODO - retrieve all posts from the database
    // render the homepage template with the posts retrieved from the database
    // refer to homepage.handlebars write the code to display the posts
    res.render("homepage", { username });
});

// TODO - create a GET route for getting a single post with its id
// this page can be viewed without logging in
router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        // filter for necessary data
        const post = postData.get({ plain: true });
        console.log(post);
        res.render("admin-single-posts", { ...post });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// This route renders the login page, which has been completed for you
router.get("/login", async (req, res) => {
    const userData = await User.findOne({
        where: { username: req.body.username },
    });

    if (!userData) {
        res.status(400).json({
            message: "Incorrect email or password, please try again",
        });
        return;
    }
    req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
        res.json(newUser);
    });
    //if users has an existing valid session, they will be redirected to the homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    //render the login view otherwise, refer to login.handlebars
    res.render("login");
});

// This route renders the signup page, which has been completed for you
router.get("/signup", (req, res) => {
    //if users has an existing valid session, they will be redirected to the homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    //render the login view otherwise, refer to signup.handlebars
    res.render("signup");
});

module.exports = router;
