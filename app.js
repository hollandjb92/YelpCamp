const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

let campGrounds = [{
    name: "Jordan Run",
    image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Mountain Creek",
    image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Jordan Run",
    image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Mountain Creek",
    image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Jordan Run",
    image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  },
  {
    name: "Mountain Creek",
    image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732d7edc974ac25e_340.jpg"
  }

];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {
    campGrounds: campGrounds
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
})


app.post("/campgrounds", (req, res) => {

  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {
    name: name,
    image: image
  }

  campGrounds.push(newCampground);

  res.redirect("/campgrounds");
})








app.listen(3000, _ => {
  console.log("Server running on Port 3000");
})