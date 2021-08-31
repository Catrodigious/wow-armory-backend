const clientId = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
const path = require("path");
const config = path.resolve(process.env.CONFIG);
const { auth: { access_token= null } = {} } = require(config);
const baseUrl = process.env.US_BASE_URL;
const namespace = process.env.NAMESPACE;
const locale = process.env.LOCALE;


const base64 = require('base-64');
const utf8 = require("utf8");

function getAuth(){
  let text = `${clientId}:${secret}`;
  const bytes = utf8.encode(text);
  let encoded = base64.encode(bytes);
  const auth = `Basic ${encoded}`;  
  return auth;
}

function getHeaders(){
  const headers = {};
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Authorization"] = getAuth();

  return headers;
}


function tokenHeader(){
  if (access_token){
   return { 
     Authorization: `Bearer ${access_token}`,
     "Content-Type": "application/json"
    }
  }else{
    return null;
  }
}

function apiUrl(path, parameters){
  const params = parameters.reduce((acc, p)=>{

    if (p.value.includes(" ")){
      const value = p.value.replace(" ", "%20");
      acc += `&${p.key}=${value}`;
    }else{
      acc += `&${p.key}=${p.value}`;
    }
    return acc;
  }, "");

  return `${baseUrl}/${path}?namespace=${namespace}${params}`;
}

module.exports = {
  getHeaders,
  tokenHeader,
  apiUrl
}

