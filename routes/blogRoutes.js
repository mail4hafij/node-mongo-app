const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

// blog
router.get("/blog", blogController.blog_index);

// add blog
router.post("/add", blogController.blog_add);

// delete blog
router.get("/delete/:id", blogController.blog_delete);

module.exports = router;
