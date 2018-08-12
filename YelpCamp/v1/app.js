var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
       {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
       {name: "Mt Goats", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
       {name: "High Rock Bluff", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
        ] ;
        
app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});