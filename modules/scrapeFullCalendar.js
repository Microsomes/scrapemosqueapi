const puppeteer = require('puppeteer');
const fs= require("fs");
async function getCalendar(){
    return new Promise(async (resolve,reject)=>{
        try{
        const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox',
        '--disable-setuid-sandbox',
   ]
       });
    const page = await browser.newPage();
    var dateMonth=new Date().getMonth()+1
   await page.goto('https://centralmosque.org.uk/wp-admin/admin-ajax.php?action=get_monthly_timetable&month='+dateMonth);
   await page.waitFor(2000);
   var cale=await page.evaluate(()=>{
       var toReturn=[]
          document.querySelectorAll("tr").forEach(derom=>{
              
            var count=0;
            var jsonTemp={
                date:"",
                day:'',
                fajr:{begin:'',Iqamah:'',sunrise:''},
                zuhr:{begin:'',Iqamah:''},
                asr:{begin:'',Iqamah:''},
                magrib:{begin:'',Iqamah:''},
                isha:{begin:'',Iqamah:''},
            }
            derom.querySelectorAll("td").forEach(item=>{
                if(item.innerText!=null){
               switch(count){
                   case 0:
                       jsonTemp.date=item.innerText
                       break;
                   case 1:
                       jsonTemp.day=item.innerText
                       break;
                   case 2:
                       jsonTemp.fajr.begin=item.innerText
                       break;
                   case 3:
                       jsonTemp.fajr.Iqamah=item.innerText
                       break;
                   case 4:
                       jsonTemp.fajr.sunrise=item.innerText
                       break;
                   case 5:
                       jsonTemp.zuhr.begin=item.innerText
                       break;
                   case 6:
                       jsonTemp.zuhr.Iqamah=item.innerText
                       break;
                   case 7:
                       jsonTemp.asr.begin= item.innerText
                       break;
                   case 8:
                       jsonTemp.asr.Iqamah= item.innerText
                       break;
                   case 9:
                       jsonTemp.magrib.begin= item.innerText
                       break;
                   case 10:
                       jsonTemp.magrib.Iqamah= item.innerText
                       break;
                   case 11:
                       jsonTemp.isha.begin= item.innerText
                       break;
                   case 12:
                       jsonTemp.isha.Iqamah= item.innerText
                       break;
               }
               count++;
               }
           })
           toReturn.push(jsonTemp)
         })
         return toReturn;
   })
   browser.close();
   resolve(cale);
}catch(e){
    reject(e);
}
});
}
module.exports=getCalendar