// let calcsList = [];

function validatedCalculate(calcToMake) {
  if (
    validateOperation(calcToMake) &&
    validateValue1(calcToMake) &&
    validateValue2(calcToMake)
  ) {
    let value1 = Number(calcToMake.value1);
    let value2 = Number(calcToMake.value2);
    let answer;
    switch (calcToMake.operation) {
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
    calcToMake.answer = answer;
    return calcToMake;
  }
}
function validateOperation(calcToMake) {
  let valid = false;
  switch (calcToMake.operation) {
    case "+":
    case "-":
    case "*":
    case "/":
      valid = true;
      break;
    default:
      valid = false;
  }
  return valid;
}
function validateValue1(calcToMake) {
  let value1 = Number(calcToMake.value1);
  let valid = false;
  if (!isNaN(value1)) {
    valid = true;
  }
  return valid;
}
function validateValue2(calcToMake) {
  let value2 = Number(calcToMake.value2);
  let valid = false;
  if (!isNaN(value2)) {
    valid = true;
  }
  return valid;
}

function errorMsg(calcToMake) {
  let error = "";
  if (!validateOperation(calcToMake)) {
    error += "Invalid operator/";
  }
  if (!validateValue1(calcToMake)) {
    error += "Invalid value 1/";
  }
  if (!validateValue2(calcToMake)) {
    error += "Invalid value 2/";
  }
  return error.split("/I").join(", I").split("/").join("");
}

module.exports = {
  validatedCalculate: validatedCalculate,
  validateOperation: validateOperation,
  validateValue1: validateValue1,
  validateValue2: validateValue2,
  errorMsg: errorMsg,
};
