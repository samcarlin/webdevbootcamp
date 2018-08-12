var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there!"); 
});

app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

app.get("/dog", function(req, res){
    console.log("someone made a request to /dog");
    res.send("Meow!");
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit + " subreddit");
});

app.get("/r/subredditName/comments/:id/:title/", function(req, res){
    res.send("welcome to the comments page");
});

app.get("*", function(r4eq, res){
    res.send("You are a star");
})
//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});
    