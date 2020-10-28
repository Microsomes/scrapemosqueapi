const puppeteer = require('puppeteer');
const fs= require("fs");
var SHA256 = require("crypto-js/sha256");



var currentdate = new Date(); 
var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();



async function scrapeNews() {
    return new Promise(async(resolve,reject)=>{
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox',
    '--disable-setuid-sandbox',
]
   });   
   
   const page = await browser.newPage();

   await page.goto("https://centralmosque.org.uk/news/",{
   waitUntil: 'networkidle0'
    }
   )

   var allNews= await page.evaluate(()=>{
    var toReturn=[]
    document.querySelectorAll(".blog-post").forEach(item=>{
        try{

            var link=null;
            var postTitle=null;
            var description=null;
            var date=null;

            if(item.querySelector("a").getAttribute("href")){
                link=item.querySelector("a").getAttribute("href");
            }

            if(item.querySelector(".entry-title").innerText){
                postTitle=item.querySelector(".entry-title").innerText

            }

            if(item.querySelector(".entry-summary").innerText){
               description= item.querySelector(".entry-summary").innerText
            }

            if(item.querySelector(".entry-meta").innerText){
                 date= item.querySelector(".entry-meta").innerText
            }

        
        toReturn.push({
            title:postTitle,
            link:link,
            description:description,
            date:date,
        })
        }catch(e){
            console.log(e);
        }finally{
        }
    })
    return toReturn
   })

   await browser.close();


   console.log(SHA256("Message").toString());
   

   allNews.forEach(item=>{
       item.id=SHA256(item.title+item.link+item.description+item.date).toString()
   })


   var toR={
       dateScrapped:currentdate.toUTCString(),
       news:allNews
   }

   console.log(toR);
   fs.writeFile("news.json",JSON.stringify(toR,null,2),(err)=>{
       reject(err);
   });

   resolve(toR);
        
})
 }



module.exports=scrapeNews;


