const express = require("express");
const router = express.Router({
  mergeParams: true
});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, (req, res) => {

  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {
        campground: campground
      });
    }
  });
});

//Comments Create
router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {

      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err)
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  });
});

//COMMENT EDIT
router.get("/:commentId/edit", checkCommentAuth, (req, res) => {
  Comment.findById(req.params.commentId, (err, foundComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campgroundId: req.params.id,
        comment: foundComment
      });
    }
  });
});

//COMMENT UPDATE

router.put("/:commentId", checkCommentAuth, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })

});


//COMMENT DESTROY
router.delete("/:commentId", checkCommentAuth, (req, res) => {
  Comment.findByIdAndDelete(req.params.commentId, err => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCommentAuth(req, res, next) {
  if (req.isAuthenticated()) {

    Comment.findById(req.params.commentId, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back")
        }

      }
    })
  } else {
    res.redirect("back");
  }

}

module.exports = router;