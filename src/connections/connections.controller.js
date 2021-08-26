const fs = require('fs');
const fetch = require("node-fetch");
const { getHeaders } = require("../utils/requestSetup");

function getAccessToken(req, res, next){
  const headers = getHeaders();
  try{
    fetch("https://us.battle.net/oauth/token", {
      headers: headers,
      body: "grant_type=client_credentials",
      method: "POST"
    })
    .then((response) => response.json())
    .then((response) => {
      try{
        fs.writeFileSync(process.env.CONFIG, JSON.stringify({auth: response}, null, 2));
      }catch(err){
        res.status(403).json({message: err})
      }
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.log(err);
      res.status(400).json({message: err});
    });

  }catch(err){
    console.log("error: ", err);
   res.status(400).json({message: err}); 
  }
  
}

module.exports = {
  getAccessToken
}