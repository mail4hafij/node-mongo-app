const express = require("express");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();
// register view engine
app.set("view engine", "ejs");
// listen for request
app.listen(3000);
// middleware (static css)
app.use(express.static("static"));
// middleware (logging)
app.use(morgan("dev"));
// mongo db connection
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    user: "lorem",
    pass: "ipsum",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
// body-parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// middleware simple example with next
app.use((req, res, next) => {
  console.log("host: ", req.hostname);
  // move out from middleware.
  next();
});

// home
app.get("/", (req, res) => {
  // Sets the content type header.
  res.render("index", { greeting: "Hello Lorem ipsum" });
});

// middleware (router)
app.use(blogRoutes);

// middleware (404 page)
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render("404");
});
