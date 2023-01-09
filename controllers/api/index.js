
//index.js inside /api combines all api routes and exports one router middleware module
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//userRoutes will have /user prepended to all routes
router.use('/user', userRoutes);
//postRoutes will have /post prepended to all routes
router.use('/post', postRoutes);
//commentRoutes will have /comment prepended to all routes
router.use('/comment', commentRoutes);

module.exports = router;
