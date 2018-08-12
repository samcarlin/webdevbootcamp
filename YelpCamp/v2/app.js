var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Mt Goats", 
//         image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg",
//         description: "This is a mountain with goats. Lots of hills."
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }    
//     });

var campgrounds = [
       {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
       {name: "Mt Goats", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
       {name: "High Rock Bluff", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
        ] ;
        
app.get("/", function(req,res){
    res.render("landing");
});
//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("campgrounds", {campgrounds: allCampgrounds}); 
        }
    });
    
});
//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
           console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});
//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
//SHOW- shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          console.log(err);
         } else { 
           res.render("show", {campground: foundCampground}); 
         }
});
    });
    

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});

