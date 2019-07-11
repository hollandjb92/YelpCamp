const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelpCamp", {
  useNewUrlParser: true
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));

seedDB();

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
  next();
})

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/", (req, res) => {
  res.render("landing");
});


//INDEX ROUTE - SHHOW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {

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
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
})

//CREATE ROUTE - ADD CAMPGROUND TO DATABASE
app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description
  let newCampground = {
    name: name,
    image: image,
    description: desc
  }

  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
})

//SHOW ROUTE - SHOWS MORE INFO ABOUT ONE SPECIFIC CAMPGROUND
app.get("/campgrounds/:id", (req, res) => {
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

// COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {

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


app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {

      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err)
        } else {
          console.log(comment)
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  });
});


//AUTH ROUTES
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
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

app.get("/login", (req, res) => {
  res.render("login")
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {

});

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, _ => {
  console.log("Server running on Port 3000");
})