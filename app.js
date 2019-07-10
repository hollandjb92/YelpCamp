const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelpCamp", {
  useNewUrlParser: true
});

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Granite Hill",
//   image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732d7dd59649c258_340.jpg",
//   description: "This is a huge granite hill! No bathroms, no running water, beautiful granite views!"
// }, (err, campground) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(campground);
//   }
// })


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("landing");
});


//INDEX ROUTE - SHHOW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {

  Campground.find({}, (err, campGrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render("index", {
        campGrounds: campGrounds
      })
    }
  })
});

//NEW ROUTE - DISPLAYS FORM TO MAKE A NEW CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
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
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err)
    } else {
      res.render("show", {
        campground: foundCamp
      });
    }
  });
});








app.listen(3000, _ => {
  console.log("Server running on Port 3000");
})