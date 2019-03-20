const http = require('http')
const path = require('path')
const express = require('express')
const strftime = require('strftime')
const router = express()
const server = http.createServer(router)

router.get('/:date', (req, res)=>{
  let date = new Date();  
  
  if(/^\d*$/.test(req.params.date)){
    date.setTime(req.params.date)
  }else{
    date = new Date(req.params.date)
  }
  res.set({'Content-Type': 'application/json'})  
  
  if(!date.getTime()) res.send(JSON.stringify({error: "Invalid data given"}))
  else res.send(JSON.stringify({
    unix: date.getTime(),
    natural: strftime('%B %d %Y', date)
  }))
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",()=>{
  let addr = server.address()
  console.log("Timestamp microservice listening at",addr.address + ":" + addr.port);
  
})