let middlewareObj = {};
const Campground = require("../models/campground");
const Comment = require("../models/comment");

middlewareObj.checkUserAuth = (req, res, next) => {


  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        if (foundCamp.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }

      }
    })
  } else {
    req.flash("error", "You need to be logged in to do that")
    res.redirect("back");
  }
}

middlewareObj.checkCommentAuth = (req, res, next) => {

  if (req.isAuthenticated()) {

    Comment.findById(req.params.commentId, (err, foundComment) => {
      if (err) {

        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back")
        }

      }
    })
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}


module.exports = middlewareObj;