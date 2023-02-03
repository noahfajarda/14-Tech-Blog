const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log(req.session);
        console.log(req.session.userId);

        Comment.create({
            body: req.body.body,
            postId: req.body.postID,
            userId: req.body.userID,
        })
            .then((commentData) => {
                res.json(commentData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
