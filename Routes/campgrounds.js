const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

//INDEX ROUTE - SHHOW ALL CAMPGROUNDS
router.get("/", (req, res) => {

  Campground.find({}, (err, campGrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render("campgrounds/index", {
        campGrounds: campGrounds,
      })
    }
  })
});

//NEW ROUTE - DISPLAYS FORM TO MAKE A NEW CAMPGROUND
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
})

//CREATE ROUTE - ADD CAMPGROUND TO DATABASE
router.post("/", isLoggedIn, (req, res) => {


  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };

  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  })
})

//SHOW ROUTE - SHOWS MORE INFO ABOUT ONE SPECIFIC CAMPGROUND
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCamp) => {
    if (err) {
      console.log(err)
    } else {

      res.render("campgrounds/show", {
        campground: foundCamp
      });
    }
  });
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;