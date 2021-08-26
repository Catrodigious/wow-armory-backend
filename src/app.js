const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// store what's below in their own error components
app.use((req, res, next)=>{
  res.status(404).send({message: `${req.originalUrl} was not found.`});
})

app.use((err, req, res, next) => {
  res.status(404).send({message: `Error occurred: ${err}`});
});

module.exports = app;