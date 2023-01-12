//withAuth middleware function is done for you to check for a userId on the session object
//if there is no userId, the user is redirected to the login page
//use this middleware function on any routes that require a user to be logged in to access
const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        console.log("BLOCKED");
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = withAuth;
