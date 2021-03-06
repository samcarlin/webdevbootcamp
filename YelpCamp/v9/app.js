var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment =require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
//requiring routes    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
    
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/yelp_camp_v9"), {useMongoClient: true};
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seed the database
// seedDB();

//passport config
app.use(require("express-session")({
    secret: "Presley is the best beagle.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


// var campgrounds = [
//       {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
//       {name: "Mt Goats", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
//       {name: "High Rock Bluff", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
//         ] ;

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});

