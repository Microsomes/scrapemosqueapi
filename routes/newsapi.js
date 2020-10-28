const express= require("express");
const remote= express.Router();
const fs= require("fs");

const scrapeNews= require("../modules/scrapeNews.js");


remote.get("/",(req,res,next)=>{
    res.status(200).json({
        status:"OK",
        msg:"Welcome to Birmingham Central Mosque news api"
    })
})

remote.get("/refresh",(req,res,next)=>{
    scrapeNews().then(news=>{
        res.status(200).json({
            status:"OK",
            datatype:"live",
            news:news
        })
    })
})

remote.get("/cachenews",(req,res,next)=>{
    var news= fs.readFileSync("./modules/news.json")
    console.log(news.toString())
    res.status(200).json({
        status:"OK",
        datatype:"cache",
        news:JSON.parse(news.toString())
    })
})










module.exports=remote;