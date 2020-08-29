const puppeteer = require('puppeteer');
var currentdate = new Date(); 
var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
async function scrapeNamaz(which){
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox',
     '--disable-setuid-sandbox',
]
    });
    const page = await browser.newPage();
    await page.goto('https://centralmosque.org.uk/mobile-timetable/');
    await page.waitFor(2000);
    //begin scrapping
    var allPrayers= await page.evaluate(()=>{
        var allP= document.querySelectorAll(".prayer-start");
        var toReturn=[]
        toReturn.push({
            name:"farj",
            value:allP[0].innerText,
            englishName:"first prayer",
            englishSmall:"first"
        })
        toReturn.push({
            name:"zhur",
            value:allP[2].innerText,
            englishName:"second prayer",
            englishSmall:"second"
        })
        toReturn.push({
            name:"asr",
            value:allP[3].innerText,
            englishName:"third prayer",
            englishSmall:"third"
        })
        toReturn.push({
            name:"maghrib",
            value:allP[4].innerText,
            englishName:"fourth prayer",
            englishSmall:"fourth"
        })
        toReturn.push({
            name:"isha",
            value:allP[5].innerText,
            englishName:"fifth prayer",
            englishSmall:"fifth"
        })
        return toReturn;
    })
    return {
        prayers:allPrayers,
        dateScrapped:Date.now(),
        dateEnglish:datetime
    };
}
module.exports= scrapeNamaz;