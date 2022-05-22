const express = require("express");
const PostController = require("../controllers/post");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRole } = require("../middlewares/validarRole");

const router = express.Router();

router.post("/add-post", validarJWT, PostController.addPost);
router.get("/get-posts", PostController.getPosts);
router.put("/update-post/:id", validarJWT, PostController.updatePost);
router.delete("/delete-post/:id", [validarJWT], PostController.deletePost);
router.get("/get-post/:url", PostController.getPost);
router.get("/get-post-topic/:topic", PostController.getPostByTopic);

module.exports = router;