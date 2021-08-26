const clientId = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
const tokenUrl = process.env.OAUTH_TOKEN_URL;

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

module.exports = {
  getHeaders
}