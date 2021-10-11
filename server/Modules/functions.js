function validatedCalculate(calcToMake) {
  let operator = validatedTerms(calcToMake).operator;
  let values = validatedTerms(calcToMake).values;
  let answer;
  switch (operator) {
    case "+":
      answer = values[0] + values[1];
      break;
    case "-":
      answer = values[0] - values[1];
      break;
    case "*":
      answer = values[0] * values[1];
      break;
    case "/":
      answer = values[0] / values[1];
      break;
  }
  calcToMake.answer = answer;
  calcToMake.value1 = values[0];
  calcToMake.value2 = values[1];
  calcToMake.operation = operator;
  return calcToMake;
}

function validatedTerms(calcToMake) {
  let validatedTerms = {};
  let calcArr = [...calcToMake.calcString];
  let operator = calcArr
    .filter(
      (term) => term === "+" || term === "-" || term === "*" || term === "/"
    )
    .toString();
  let values = calcToMake.calcString
    .split(operator)
    .map((term) => Number(term));
  if (operator.length === 1) {
    validatedTerms.operator = operator;
  } else {
    validatedTerms.operator = false;
  }
  if (values.filter((term) => isNaN(term)).length === 0) {
    validatedTerms.values = values;
  } else {
    validatedTerms.values = false;
  }
  return validatedTerms;
}

module.exports = {
  validatedCalculate: validatedCalculate,
  validatedTerms: validatedTerms,
};
