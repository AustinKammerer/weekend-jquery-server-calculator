function calculate(req) {
  let answer;
  switch (req.operation) {
    case "add":
      answer = req.value1 + req.value2;
      break;
    case "sub":
      answer = req.value1 - req.value2;
      break;
    case "mult":
      answer = req.value1 * req.value2;
      break;
    case "div":
      answer = req.value1 / req.value2;
      break;
  }
  req.answer = answer;
}

module.exports = calculate;
