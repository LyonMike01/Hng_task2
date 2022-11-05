const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const opt = require("./operation");
const nlp = require("./nlp");

const app = express();
const port = process.env.PORT || 3000;
const slackUsername = "Lyonmike01";

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/", (req, res) => {
  const operation_input = req.body.operation_type;
  const x = Number(req.body.x);
  const y = Number(req.body.y);

  if (
    operation_input === "addition" || 
    operation_input === "subtraction" ||
    operation_input === "multiplication"

  ) {
    let results = opt(operation_input, x, y);
    const response = {
      slackUsername: slackUsername,
      result: results.result,
      operation_type: results.operation_type,
    };
    res.send(response);
  } else {
    nlp(operation_input).then((input) => {
      let results;

      if (input === "operation.sub") {
        results = opt("subtraction", x, y);
      } else if (input === "operation.mul") {
        results = opt("multiplication", x, y);
      } else if (input === "operation.add") {
        results = opt("addition", x, y);
      }

      const response = {
        slackUsername: slackUsername,
        result: results.result,
        operation_type: results.operation_type,
      };
      res.send(response);
    });
  }
});

app.listen(
  port,
 console.log(`Server Started at Port ${port}`)
);
