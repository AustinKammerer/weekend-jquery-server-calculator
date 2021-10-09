$(pageLoad);

function pageLoad() {
  // determine the desired operation
  $(".operatorBtn").on("click", setOperation);
  // calculate the desired operation
  $("#equalBtn").on("click", calculate);
  // clear inputs
  $("#clearBtn").on("click", clearInputs);
}

function setOperation() {
  let operation = $(this).data("operation");
  $("#equalBtn").data("operation", operation);
}
// POST function
function calculate() {
  // validate inputs
  let value1 = $("#value1Input").val();
  let value2 = $("#value2Input").val();
  let operation = $("#equalBtn").data("operation");
  let valid = true;
  // if any input is an empty string (operation starts as empty string), valid is flipped to false
  if (operation === "") {
    alert("SELECT OPERATOR");
    valid = false;
  }
  if (value1 === "") {
    alert("ENTER VALUE 1");
    valid = false;
  }
  if (value2 === "") {
    alert("ENTER VALUE 2");
    valid = false;
  }
  console.log(valid);
  // only trigger POST if valid is not flipped to false
  if (valid) {
    $.ajax({
      method: "POST",
      url: "/calc",
      data: {
        value1: value1,
        value2: value2,
        operation: operation,
      },
    })
      .then(function (res) {
        getCalculations();
      })
      .catch(function (err) {
        alert("SERVER ERROR: " + err.message);
      });
  }
}

// GET function
function getCalculations() {
  $.ajax({
    method: "GET",
    url: "/calc",
  })
    .then(function (res) {
      console.log("SUCCESS", res);
      render(res);
    })
    .catch(function (err) {
      console.log("FAIL", err);
    });
}
// render function
function render(calculations) {
  let output = $("#output");
  let calcsList = $("#calcsList");
  output.empty();
  calcsList.empty();
  // loop over the server's response (array of calculation objects)
  for (let i = 0; i < calculations.length; i++) {
    // display the answer to the most recent calculation (calcs are unshifted instead of pushed)
    if ((i = 0)) {
      output.append(calculations[i].answer);
    }
    // each calculation will be captured as a JQ object so data can be added to it
    let calc = $(`
        <li>${calculations[i].value1} ${calculations[i].operation} ${calculations[i].value2} = ${calculations[i].answer}</li>
        `);
    // data is added to the calc li
    calc.data("value1", calculations[i].value1);
    calc.data("value2", calculations[i].value1);
    calc.data("operation", calculations[i].operation);
    // append to the DOM
    calcsList.append(calc);
  }
}
// clear inputs function
function clearInputs() {
  $("#value1Input").val("");
  $("#value2Input").val("");
  $("#equalBtn").data("operation", "");
}
