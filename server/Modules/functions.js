// function validatedCalculate(calcToMake) {
//   if (
//     validateOperation(calcToMake) &&
//     validateValue1(calcToMake) &&
//     validateValue2(calcToMake)
//   ) {
//     let value1 = Number(calcToMake.value1);
//     let value2 = Number(calcToMake.value2);
//     let answer;
//     switch (calcToMake.operation) {
//       case "+":
//         answer = value1 + value2;
//         break;
//       case "-":
//         answer = value1 - value2;
//         break;
//       case "*":
//         answer = value1 * value2;
//         break;
//       case "/":
//         answer = value1 / value2;
//         break;
//     }
//     calcToMake.answer = answer;
//     return calcToMake;
//   }
// }
// function validateOperation(calcToMake) {
//   let valid = false;
//   switch (calcToMake.operation) {
//     case "+":
//     case "-":
//     case "*":
//     case "/":
//       valid = true;
//       break;
//     default:
//       valid = false;
//   }
//   return valid;
// }
// function validateValue1(calcToMake) {
//   let value1 = Number(calcToMake.value1);
//   let valid = false;
//   if (!isNaN(value1)) {
//     valid = true;
//   }
//   return valid;
// }
// function validateValue2(calcToMake) {
//   let value2 = Number(calcToMake.value2);
//   let valid = false;
//   if (!isNaN(value2)) {
//     valid = true;
//   }
//   return valid;
// }

// function errorMsg(calcToMake) {
//   let error = "";
//   // if (!validateOperation(calcToMake)) {
//   //   error += "Invalid operator/";
//   // }
//   // if (!validateValue1(calcToMake)) {
//   //   error += "Invalid values/";
//   // }
//   // if (!validateValue2(calcToMake)) {
//   //   error += "Invalid values/";
//   // }
//   return error.split("/I").join(", I").split("/").join("");
// }

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
  // validatedCalculate: validatedCalculate,
  // validateOperation: validateOperation,
  // validateValue1: validateValue1,
  // validateValue2: validateValue2,
  // errorMsg: errorMsg,
  validatedCalculate: validatedCalculate,
  validatedTerms: validatedTerms,
};
