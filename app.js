
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Blogs are online platforms where individuals or organizations can publish written content on a regular basis. They can cover a wide range of topics, including personal experiences, news, opinions, or educational material. Many blogs allow readers to leave comments and engage in discussions, creating an interactive community around the content. Some blogs are focused on a specific niche or topic, while others are more general in nature. Blogging has become a popular way for people to share their thoughts and ideas with the world, and many businesses also use blogs as a marketing tool to reach and engage with their customers..";
const aboutContent = "Welcome to our website! We are a team of few passionate individuals dedicated to bringing out latest news in the tech-world. We believe in our purpose. Our website offers users to express themselves freely and write blogs. We strive to create a user-friendly experience for our visitors and provide high-quality content that is both informative and engaging. Thank you for visiting our website and we hope you find the information and resources here valuable.";
const contactContent = "The current  section conatins dummy text: Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[];

app.get("/",function(req,res){
  res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerFirst([req.params.postName]);
  posts.forEach(function(element){
    if(_.lowerFirst([element.title])===requestedTitle)
    res.render("post",{title:element.title,content:element.content});
    else
    console.log("No match");
  })
})

app.post("/compose",function(req,res){
  const post={
    title:req.body.newTitle,
    content:req.body.newPost
  }
  posts.push(post);
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
