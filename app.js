
const express = require("express");
const bodyParser = require("body-parser");
const nlp = require("./nlp");
const cors = require("cors");
const opt = require("./operation");


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const slackUsername = "Lyonmike01";
const PORT = 3000



app.post("/", (req, res) => {
  console.log(req.body);
  const operation_input = req.body.operation_type;
  const x = Number(req.body.x);
  const y = Number(req.body.y);
 console.log(operation_input.value);
   if (
    
    operation_input.value === "addition" ||
    operation_input.value === "subtraction" ||
    operation_input.value === "multiplication"
  ) {
    console.log(true);
    let result = opt(operation_input.value, x, y);

    res.send({
      slackUsername: slackUsername,
      results: result.results,
      operation_type: result.operation_type,
    });
  } else {
    nlp(operation_input.value).then((results) => {
      ({ number1, number2, operator } = results);
      console.log(results);
      let result = opt(operator, Number(number1), Number(number2));
     // console.log(result);

      res.send({
        slackUsername: slackUsername,
        result: result.results,
        operation_type: result.operation_type,
      });
    });
  }  
});

app.listen(PORT, () =>{
  console.log(`App is running on port ${PORT}`)
})