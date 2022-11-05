const nlp = require("./nlp");
const opt = require("./operation");
const dotenv =require("dotenv").config()

const slackUsername = "Lyonmike01"



exports.value = (req, res) => {
  console.log(req.body);
  const operation_input = req.body.operation_type;
  const x = Number(req.body.x);
  const y = Number(req.body.y);
  console.log(operation_input);
  if (
    operation_input === "addition" ||
    operation_input === "subtraction" ||
    operation_input === "multiplication"
  ) {
    console.log(true);
    let results = opt(operation_input, x, y);

    res.send({
      slackUsername: slackUsername,
      result: results.result,
      operation_type: results.operation_type,
    });
  } else {
    nlp(operation_input).then((result) => {
      ({ number1, number2, operator } = result);
      console.log(result);
      let results = opt(operator, Number(number1), Number(number2));
      // console.log(result);

      res.send({
        slackUsername: slackUsername,
        result: results.result,
        operation_type: results.operation_type,
      });
    });
  }
};
