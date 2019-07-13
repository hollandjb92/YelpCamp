const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");
const flash = require("connect-flash");

//requiring routes
const commentRoutes = require("./Routes/comments"),
  campgroundRoutes = require("./Routes/campgrounds"),
  authRoutes = require("./Routes/auth");


mongoose.connect("mongodb://localhost:27017/yelpCamp", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));

app.use(flash());


// seedDB(); //seed the database

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "This is our little secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});



app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", authRoutes);

app.listen(3000, _ => {
  console.log("Server running on Port 3000");
})