const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

//INDEX ROUTE - SHOW ALL CAMPGROUNDS
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
})

//CREATE ROUTE - ADD CAMPGROUND TO DATABASE
router.post("/", middleware.isLoggedIn, (req, res) => {

  let name = req.body.name;
  let image = req.body.image;
  let price = req.body.price;
  let desc = req.body.description
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author,
    price: price
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
    if (err || !foundCamp) {
      req.flash("error", "Sorry, that campground does not exist");
      console.log(err)
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {
      campground: foundCamp
    });

  });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkUserAuth, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    res.render("campgrounds/edit", {
      campground: foundCamp
    });
  });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkUserAuth, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + updatedCamp._id)
    }
  })
});

//DELETE ROUTE
router.delete("/:id", middleware.checkUserAuth, (req, res) => {
  Campground.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds");
    }
  })
});




module.exports = router;