function calculate(req) {
  let value1 = Number(req.value1);
  let value2 = Number(req.value2);
  let answer;
  switch (req.operation) {
    case "+":
      answer = value1 + value2;
      break;
    case "-":
      answer = value1 - value2;
      break;
    case "*":
      answer = value1 * value2;
      break;
    case "/":
      answer = value1 / value2;
      break;
  }
  req.answer = answer;
  return req;
}

module.exports = calculate;
