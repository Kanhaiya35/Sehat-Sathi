const express = require("express")
const router = express.Router()
const axios = require("axios")
const cheerio = require("cheerio")

router.get("/", async (req,res)=>{

try{

const url =
"https://news.google.com/rss/search?q=disease+outbreak+when:7d&hl=en-IN&gl=IN&ceid=IN:en"

const response = await axios.get(url)

const $ = cheerio.load(response.data,{xmlMode:true})

let alerts = []

$("item").slice(0,6).each((i,el)=>{

alerts.push({

title: $(el).find("title").text(),
link: $(el).find("link").text(),
date: $(el).find("pubDate").text()

})

})

res.json({
success:true,
alerts
})

}catch(err){

console.error(err)

res.status(500).json({
success:false,
message:"Unable to fetch outbreak alerts"
})

}

})

module.exports = router