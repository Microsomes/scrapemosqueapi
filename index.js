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
            source:"https://centralmosque.org.uk/",
            result:toReturn
        })
    }catch(e){
        res.sendStatus(500);
    }
})


app.get("/info",(req,res)=>{
    var address="BIRMINGHAM CENTRAL MOSQUE 180 Belgrave Middleway, Birmingham B12 0XS";
    res.status(200).json({
        status:"OK",
        address:address,
        phone:":+44121 440 5355",
        bearers:[
            "Mr. Maqbool Ahmed (Chairman)",
            "Mr. Nassar Mahmood (Vice Chairman)",
            "Mr. Mohammed Hanif (General Secretary)",
            "Mr. Niaz Ahmed (Treasurer)"
        ]
    })
})
 
app.get("/mosquehistory",(req,res,next)=>{
    var toReturn=[
        {
            title:"Mosque History",
            contents:[
                {
                    type:"description",
                    content:"Central Mosque is the second purpose built mosque in the United Kingdom. After initially raising money to lay the foundations of the mosque, funds had run dry. There was the possibility that the city council would sell the land off to another buyer if the mosque was not completed within two years. Thus the mosque trustees went to local communities for donations, both Muslim and non-Muslim. Soon enough, sufficient money was raised to pay for the building and completion of the mosque in 1969. The mosque was then officially opened in 1975 as the largest mosque in Western Europe."
                }
            ]
         },
        {
            title:"Central Mosque",
            contents:[
                {
                    type:"description",
                    content:"Since the mosque’s erection, it has become a focal point for the Muslim community. Over the years, Muslims have used the mosque for events, meetings, lectures, studies and community and educational purposes. Many of the original founders of the mosque committee still make up the mosque management or are trustees of the mosque but as time has passed, many new innovations have been made as to how the mosque is democratically run using Islamic teachings as the basis for the equal representation of all members of the community. Thus, regular meetings, annual selection, and equal opportunities have meant that the running of Birmingham Central Mosque has been as efficient as possible over the decades."
                }
            ],
        },
        {
            title:"Mosque Design",
            contents:[
                {
                    type:"description",
                    content:"The mosque itself has got two floors. On the first floor, there is a large Main Hall for prayers which can easily accommodate around 3000 worshippers at any one time. In addition, there is a Ladies’ Gallery to accommodate about 400 women. New contracts have recently been given to extend the ladies gallery as well as provide extra separate accommodation for visitors to the mosque who drop in to learn about Islam and Muslims. The ground floor is divided into two areas providing office accommodation, a community hall (Day Centre), an extensive Islamic library, educational classrooms and a large School Hall area which is used for prayers, assemblies, and other activities. On special days like Eid, when demand is high, both the Main Prayer Hall and the School Hall are used for prayers providing accommodation for 5000 people. On Eid day, there are five prayer services during which between 15,000 to 20,000 worshippers visit the mosque for the special services, and on Fridays, the gathering is 4,000 plus. This is excluding the frequent attendance of international visiting groups and mainstream media personnel."
                }
            ]
        }
    ]
    res.status(200).json({
        result:toReturn
    })
})



app.get("/opening",(req,res)=>{
    var toReturn=[
        {
            title:"",
            contents:[
                {
                    type:"titletext",
                    title:"Main Office hours: (0121 440 5355)",
                    content:"10.00am – 5.00pm Weekdays only"
                },
                {
                    type:"titletext",
                    title:"Evening School",
                    content:"5.00pm – 7.00 pm (07772 060 752) Mr. Niaz Ahmad" 
                },
                {
                    type:"titletext",
                    title:"Marriage Bureau: (0121 446 4157 & 07496 838 790)",
                    content:"Every Sun 2.00 – 5.00pm,Mon 2.00 – 4.00pm & Friday 3.00 – 6.00pm"
                },
                {
                    type:"titletext",
                    title:"Family Support Services / Shariah Council : (07494 675 916)",
                    content:"Every Mon/ Tue/Wed/Thur 5.00 – 8.00 pm (Telephone Advice only)" 
                },
                {
                    type:"titletext",
                    title:"Mosque Opening hours",
                    content:"10.00 am – approx. 30 minutes after Isha prayers"
                },
                {
                  type:"titletext",
                  title:"Ladies Prayer room",
                  content:"For Zuhr, Asr, and Maghrib prayers only!"  
                }
            ]
        }
    ]
    res.status(200).json({
        result:toReturn
    })
})

app.get("/visitingmosque",(req,res)=>{
    var toReturn=[
        {
            title:"Visiting the mosque",
            contents:[
                {
                    type:"description",
                    content:"Visits to the mosque should be booked in advance by telephone, email, post or in person. Preferred visit times and days are between 10.00 am and 4.00 pm. (Mondays, Tuesday, Wednesday, and Thursday Preferably). Special – Friday, early morning or late evening – visits can be arranged on request and are subject to availability."
                },
                {
                    type:"bullet",
                    title:"A usual visit to the mosque consists of the following:",
                    points:[
                        "Multi-media presentation about Islamic faith.",
                        "Q&A and discussion session.",
                        "A guided tour of the mosque building accompanied by a faith guide.",
                        "Observation of one of the daily or special prayer services.",
                        "Interactive activities for school children."
                    ]
                },
                {
                    type:"description",
                    content:"We usually provide snacks or treats for visitors. Please let us know if any visitors suffer from any allergies in this respect. For primary school children, we also have special worksheets prepared about the mosque which they may take back with them. There is also free literature on Islam for all visitors."

                }
            ]
             
        },
        {
            title:"General Rules",
            contents:[
                {
                    type:"bullet",
                    title:"All visitors are requested to:",
                    points:[
                        "Respect the peace and prayer of worshippers inside the mosque.",
                        "Remove their shoes in certain specific areas around the mosque",
                        "Keep food and drinks out of the mosque, except areas that have been designated as eating areas.",
                        "Avoid bringing any animals into the mosque.                        ",
                        "Keep the mosque’s building and courtyard clean by disposing off litter properly and safely.                        ",
                        "Abide by the general rules of the mosque as displayed around the building.                        ",
                        "Avoid smoking in the building and on the mosque’s courtyard.                        "
                    ]
                },
                {
                    type:"description",
                    content:"Please note that we may discontinue any visit if find any disrespectful or inappropriate behaviour and ask visitors to leave the building.                    "
                }
            ]

        },
        {
            title:"Modest Dress",
            contents:[
                {
                    type:"bullet",
                    title:"",
                    points:[
                        "All adult visitors and children above the age of 12 are requested to observe modest dress when visiting the mosque. Most aspects of a standard school uniform are quite appropriate as long as arms and legs are covered.",
                        "Female visitors may cover their heads to show respect to other worshippers or to enrich their own experience.                        ",
                        "Young children under the age of 12 are not considered to be adults and may dress as they do in school unless they wish to adopt any part of Muslim attire for the day (hats/scarves) to enliven their visit.                        "
                    ]
                }
            ]
        },
        {
            title:"Contributions/Donations:",
            contents:[
                {
                    type:"description",
                    content:"Visits to the mosque are free of charge. However, because the mosque is a registered charity, donations towards our services are always welcome and appreciated. We accept cash, postal orders, and cheques. Please make them payable to Birmingham Mosque Trust Ltd.",
                },
                {
                    type:"dividerTop",
                    content:"Our Services"
                },
                {
                    type:"bullet",
                    title:"The Birmingham Central Mosque Trust offers various services for the public including:",
                    points:[
                        "Marriage Bureau, Introductions and registrations.",
                        "Family Counselings Clinics.",
                        "Religious Education visits.",
                        "Evening School for children.",
                        "Funeral Services & Mortuary.",
                        "Community Classes for adults.",
                        "Booking facilities for private functions.",
                        "Library, Literature & Faith Conversion Services.",
                        "Food Bank"
                    ]
                },
                {
                    type:"text",
                    content:"For more information, please contact the Main Office. 0121 440 5355"
                },
                {
                    type:"text",
                    content:"Email: enquiries@centralmosque.org.uk"
                },
                {
                    type:"text",
                    content:"By Phone : 0121 440 5355"
                },
                {
                    type:"text",
                    content:"By Email: enquiries@centralmosque.org.uk"
                }
            ]
        }
    ]
    res.status(200).json({
        result:toReturn
    })
})

app.get("/",(req,res)=>{
    res.status(200).json({
        status:"OK",
        localtion:"Birmingham United Kingdom",
        mosque:"Birmingham Central Mosque",
        routes:{
            "/namaz":{
                args:[],
                desc:"Current prayer time"
            },
            "/full":{
                args:[],
                desc:"Full current month calender"
            },
            "/info":{
                args:[],
                desc:"Basic contact info"
            },
            "/mosquehistory":{
                args:[],
                desc:"Mosque History"
            },
            "/visitingmosque":{
                "args":[],
                desc:"Visiting the mosque"
            }
            ,
            "/opening":{
                "args":[],
                desc:"Opening times for the mosque"
            }
        }
    })
})



const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT)
//works
