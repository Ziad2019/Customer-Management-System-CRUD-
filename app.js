const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path=require("path")
const port=3001;
const customersData=require("./models/customersSchema");
const moment=require("moment");
const methodOverride=require("method-override");
const { console } = require("inspector");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));

// to get home page from ejs file
app.get("/", (req, res) => {
    customersData.find().then((result)=>{
        res.render("index",{arr:result,moment:moment});
    })
  
});
// to get home add from ejs file
app.get("/user/add.html",(req,res)=>{
    res.render("user/add");
});

// to get home view from ejs file
app.get("/view/:id",(req,res)=>{
    customersData.findById(req.params.id).then((result)=>{
       res.render("user/view",{objectId:result,moment:moment});
       console.log(result)
    })
   
    
});

// to get edit add from ejs file
app.get("/edit/:id",(req,res)=>{
    customersData.findById(req.params.id).then((result)=>{
        res.render("user/edit", {objectId:result});
    })
    
});

// to send data to database (mongodb)
app.post("/user/add.html",(req,res)=>{
    
    customersData.create(req.body).then(()=>{
        res.redirect("/");
        }).catch((err)=>{
            console.log(err);
    })
});

// to delete data from database

app.delete("/edit/:id",(req,res)=>{
    customersData.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect("/");
    })
})

//to update data from edit page
app.put("/edit/:id",(req,res)=>{
    customersData.findByIdAndUpdate(req.params.id,req.body).then(()=>{
        res.redirect("/");
    })
})



mongoose.connect(
  "mongodb://project:admin@ac-v4lgwgv-shard-00-00.8jwfqlk.mongodb.net:27017,ac-v4lgwgv-shard-00-01.8jwfqlk.mongodb.net:27017,ac-v4lgwgv-shard-00-02.8jwfqlk.mongodb.net:27017/customersData?replicaSet=atlas-w03yef-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    app.listen(port, (req, res) => {
        console.log(port);
      });
}).catch((err)=>{
    console.log(err);
})
