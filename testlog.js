const axios= require("axios");


async function lad(){

    var api="http://178.62.3.11:99/namaz";

    var res= await axios.get("http://178.62.3.11:99/namaz");

    console.log(res.data.times[0]);


    return 1;
}


lad();