const express = require("express");
const router = express.Router({
  mergeParams: true
});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {

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
router.post("/", middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash("error", "Something went wrong");
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
          req.flash("success", "Succesfully added new comment");
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  });
});

//COMMENT EDIT
router.get("/:commentId/edit", middleware.isLoggedIn, middleware.checkCommentAuth, (req, res) => {
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

router.put("/:commentId", middleware.checkCommentAuth, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })

});


//COMMENT DESTROY
router.delete("/:commentId", middleware.checkCommentAuth, (req, res) => {
  Comment.findByIdAndDelete(req.params.commentId, err => {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});



module.exports = router;