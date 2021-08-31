if (process.env.NODE_ENV !== "production") require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectionsRouter = require("./connections/connections.router");
const armoryRouter = require("./armory/armory.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/connections", connectionsRouter);
app.use("/armory", armoryRouter);

// store what's below in their own error components
app.use(notFound);
app.use(errorHandler);

module.exports = app;