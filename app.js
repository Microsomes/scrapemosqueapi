var scrape= require("./modules/scrapeNamaz");
var cors= require("cors");
const ExpressCache = require('express-cache-middleware')
const cacheManager = require('cache-manager') 
const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: 'memory', max: 10000, ttl: 36000
    })
)
const express= require("express");
const app= express();
cacheMiddleware.attach(app)
app.use(cors());
app.get("/namaz",async (req,res)=>{
    res.status(200).json({
        localtion:"Birmingham United Kingdom",
        source:"https://centralmosque.org.uk/mobile-timetable/",
        times:await scrape("one")
    })
});
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT)