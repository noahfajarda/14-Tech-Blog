const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", async (req, res) => {
    console.log("OEIREIOB", req.body);

    try {
        await Comment.create({ ...req.body, userId: req.session.userId });
        res.redirect("/dashboard");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
