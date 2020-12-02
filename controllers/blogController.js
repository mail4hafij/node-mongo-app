const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blog", { blogs: result });
    })
    .catch((error) => {
      console.log(error);
    });
};

const blog_add = (req, res) => {
  console.log(req.body);
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
  });

  blog
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/blog");
    })
    .catch((error) => {
      console.log(error);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/blog");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  blog_index,
  blog_add,
  blog_delete,
};
