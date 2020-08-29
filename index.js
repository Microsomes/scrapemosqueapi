var scrape= require("./modules/scrapeNamaz");
var fullCalender= require("./modules/scrapeFullCalendar");
var cors= require("cors");
const ExpressCache = require('express-cache-middleware')
const cacheManager = require('cache-manager') 
const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: 'memory', max: 10000, ttl: 36000
    })
)
const express= require("express");
const getCalendar = require("./modules/scrapeFullCalendar");
const app= express();
cacheMiddleware.attach(app)
app.use(cors());
app.get("/namaz",async (req,res)=>{
    try{
    res.status(200).json({
        status:"OK",
        localtion:"Birmingham United Kingdom",
        mosque:"Birmingham Central Mosque",
        source:"https://centralmosque.org.uk/mobile-timetable/",
        result:await scrape("one")
    })
    }catch(e){
        res.sendStatus(500);
    }
});


app.get("/full",async (req,res)=>{
    try{
        var to= await getCalendar();
        var toReturn=[];
        for(var i=0;i<to.length;i++){
            if(i>=2){
            toReturn.push(to[i]);
            }
        }
        res.status(200).json({
            status:"OK",
            localtion:"Birmingham United Kingdom",
            mosque:"Birmingham Central Mosque",
            source:"https://centralmosque.org.uk/mobile-timetable/",
            result:toReturn
        })
    }catch(e){
        res.sendStatus(500);
    }
})


const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT)
//works
