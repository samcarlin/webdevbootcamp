var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Cloud's Rest", 
    image: "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {name: "Wooded Forest", 
    image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {name: "Mountain Bluff", 
    image: "https://farm8.staticflickr.com/7179/6927088769_cc14a7c68e.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]

function seedDB(){
    //remove campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(function(seed){
          Campground.create(seed, function(err, campground){
              if(err){
                  console.log(err)
              } else {
                  console.log("added a campground");
                  //create a comment
                  Comment.create(
                     {
                      text: "This place is great, but I wish there was internet",
                      author: "Homer"
                     }, function(err, comment){
                      if(err){
                          console.log(err);
                      } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                  });
              }
          });
    });
});
  
    //add a few comments
}

module.exports = seedDB;