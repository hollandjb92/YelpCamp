const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

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

//EDIT ROUTE
router.get("/:id/edit", checkUserAuth, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    res.render("campgrounds/edit", {
      campground: foundCamp
    });
  });
});

//UPDATE ROUTE
router.put("/:id", checkUserAuth, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + updatedCamp._id)
    }
  })
});

//DELETE ROUTE
router.delete("/:id", checkUserAuth, (req, res) => {
  Campground.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds");
    }
  })
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkUserAuth(req, res, next) {
  if (req.isAuthenticated()) {

    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        res.redirect("back");
      } else {
        if (foundCamp.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }

      }
    })
  } else {
    res.redirect("back");
  }

}

module.exports = router;