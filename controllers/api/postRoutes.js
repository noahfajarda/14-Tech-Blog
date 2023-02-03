const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.session);
        console.log(req.session.userId);
        console.log(req.body.content);

        Post.create({
            title: req.body.title,
            body: req.body.content,
            userId: req.session.userId,
        })
            .then((postData) => res.json(postData))
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put("/update/:id", async (req, res) => {
    try {
        console.log("Req.body", req.body);
        console.log("Req.session", req.session);
        console.log("Req.session.userId", req.session.userId);
        console.log("Req.body.content", req.body.content);
        console.log("Req.body.postid", req.body.postid);

        const data = await Post.findByPk(req.body.postid);
        console.log(data.get({ plain: true }));

        Post.update(
            {
                title: req.body.title,
                body: req.body.content,
            },
            {
                where: {
                    id: req.body.postid,
                },
            }
        ).then((data) => {
            console.log(data);
            if (!data) {
                res.status(404).json({
                    message: "Unable to find post",
                });
                return;
            }
        });
        res.status(200).json(
            `Successfully updated post with postid ${req.body.postid}`
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete("/delete/:id", async (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    }).then((data) => {
        console.log(data);
        if (!data) {
            res.status(404).json({
                message: "Unable to find post",
            });
            return;
        }
    });
    res.status(200).json(
        `Successfully deleted post with postid ${req.body.postid}`
    );
});

module.exports = router;
