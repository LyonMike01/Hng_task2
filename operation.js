function performOperation(opt, x, y) {
  let results;
  const operation = {
    ADD: "addition",
    SUBTRACT: "subtraction",
    MULTIPLACTION: "multiplication",
  };
  switch (opt) {
    case operation.ADD:
      results = x + y;
      break;
    case operation.SUBTRACT:
      results = x - y;
      break;
    case operation.MULTIPLACTION:
      results = x * y;
      break;
    default:
      results = null;

      break;
  }
  return { results: results, operation_type: opt };
}

module.exports = performOperation;
