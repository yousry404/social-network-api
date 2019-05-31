const express = require("express");
const passport = require("passport")
const router = express.Router();
const userController = require("../controllers/user.controller")
const postController = require("../controllers/post.controller")



router.post("/signup", userController.signup)
router.post("/login", userController.login);

router.get("/posts", passport.authenticate("jwt", { session: false }), postController.getPosts);
router.post("/add-post", passport.authenticate("jwt", { session: false }), postController.createPost);
router.post("/edit-post", passport.authenticate("jwt", { session: false }), postController.editPost);

module.exports = router;