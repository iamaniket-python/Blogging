const express =require("express");
const app = express();
const port =8080;
const path =require("path")

app.use(express.urlencoded({extends :true}))

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"))

const { v4: uuidv4 } = require('uuid');
const methodOverride=require('method-override');

// const { runInNewContext } = require("vm");

app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname,"public")));


let posts=[
        {
        id : uuidv4(),
        image :"",
        shayari :" Hum Bhi Kisi Ke Dil Hawalaat Mein Qaid The Kabhi🌸🥀 Phir Usne Gairo Ki Zamaanaat Pe Humein Riha Kar Diya🥺🤍 🦋🦋 ",
        name :"Aniket Shrivastava",
        profile_image :"",
        },
        {
         id : uuidv4(),
        image :"",
        shayari :"Kabhi Yaadein, Kabhi Baatein, Kabhi Pichhli Mulaqatain!! Bohat Kuch Yaad Aata Hai, Tere Ik Yaad Aane Se🖇💐💔🙂",
        name :"Sultan mirza",
        profile_image :"",
        },
    ]

app.get("/", (req ,res)=>{
    res.render("index.ejs", { posts });
    
})

app.get("/posts/new", (req,res)=>{
    res.render("add.ejs")
})

app.post("/posts", (req, res) => {
    let { image,name, shayari,profile_image } = req.body;
    let newid =uuidv4();
    posts.push({ newid,image,name, shayari,profile_image});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
    let { id } =req.params;
    let post =posts.find((p)=> id === p.id);
    res.render("show.ejs",{post})
});

app.patch("/posts/:id",(req, res)=>{
    let { id } =req.params;
    let newContent =req.body.content;
    let post =posts.find((p)=> id === p.id);
    post.content =newContent;
    console.log(post);
    res.redirect("/posts",);
})


app.get("/posts/:id/edit", (req,res)=>{

    let { id } =req.params;
    let post =posts.find((p)=> id === p.id);
    res.render("edit.ejs" ,{ post });
})

app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
    posts =posts.filter((p)=> id === p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listing to port :8080")
})