const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");



//Root Route
router.get("/", (req, res) => {
  res.render("landing");
});

//Show Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

//Handle Register Logic
router.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }

    passport.authenticate("local")(req, res, _ => {
      res.redirect("/campgrounds");
    });
  });
});

//Show Login form
router.get("/login", (req, res) => {
  res.render("login")
});

//Handle Login Logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {

});

//Logout route
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;