const { PORT = 5000 } = process.env;

const app = require("./app");

const listener = () => console.log(`Listening on Port ${PORT}!`);

try{
  app.listen(PORT, listener);
}catch(err){
  console.log(`Something went wrong in attempting to connect to ${PORT}: ${err}`)
}