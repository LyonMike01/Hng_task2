
const express = require("express");
const bodyParser = require("body-parser");
const nlp = require("./nlp");
const cors = require("cors");
const opt = require("./operation");
const dotenv =require("dotenv").config()
const app = express();
app.use(cors());
const {router} = require("./router")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const slackUsername = process.env.SLACK
const PORT = process.env.PORT


// console.log(dotenv.parsed);

app.use("/", router)


app.listen(PORT, () =>{
  console.log(`App is running on port ${PORT}`)
})