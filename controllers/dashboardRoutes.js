// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
    // TODO - retrieve all posts from the database for the logged in user
    console.log(req.session.userId);
    const postsData = await Post.findAll({
        where: { userId: req.session.userId },
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
        ],
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    // console.log("here are the user's posts", posts);
    res.render("admin-all-posts", { layout: "dashboard", posts });

    // refer to admin-all-posts.handlebars write the code to display the posts
});

// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post
router.get("/new", (req, res) => {
    res.render("create-new-post", {
        loggedIn: true,
    });
});

// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post
router.get("/edit/:id", async (req, res) => {
    try {
        const singlePostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });
        const singlePost = singlePostData.get({ plain: true });
        console.log("SINGLE POST", singlePost);
        res.render("edit-post", { layout: "dashboard", singlePost });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
