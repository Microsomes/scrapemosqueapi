const puppeteer = require('puppeteer');


async function getCalendar(){
    const browser = await puppeteer.launch({headless:false});
   const page = await browser.newPage();
   await page.goto('https://centralmosque.org.uk/wp-admin/admin-ajax.php?action=get_monthly_timetable&month=8');
   await page.waitFor(2000);

   var cale=await page.evaluate(()=>{
       var toReturn=[]

       var jsonTemp={
           date:"",
           day:'',
           fajr:{begin:'',Iqamah:'',sunrise:''},
           zuhr:{begin:'',Iqamah:''},
           asr:{begin:'',Iqamah:''},
           magrib:{begin:'',Iqamah:''},
           isha:{begin:'',Iqamah:''},
       }

        var count=0;
        document.querySelectorAll("tr")[02].querySelectorAll("td").forEach(item=>{
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
        return toReturn;
   })

   console.log(cale);



}

getCalendar();