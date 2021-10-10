$(pageLoad);

function pageLoad() {
  // determine the desired operation
  $(".operatorBtn").on("click", setOperation);
  // calculate the desired operation
  $("#equalBtn").on("click", calculate);
  // clear inputs
  $("#clearBtn").on("click", clearInputs);
  // initialize DOM
  getCalculations();
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
        console.log("POST SUCCESS", res);
        getCalculations();
      })
      .catch(function (err) {
        console.log(err);
        alert("SERVER ERROR: " + err.responseJSON.msg);
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
      $("#equalBtn").data("operation", ""); // sets/resets data-operation
    })
    .catch(function (err) {
      console.log("GET FAIL", err);
      alert(`SERVER ERROR: ${err.status} (${err.statusText})`);
    });
}
// render function
function render(calcsList) {
  let output = $("#output");
  let calcsListOnDOM = $("#calcsListOnDOM");
  output.empty();
  calcsListOnDOM.empty();
  // loop over the server's response (array of calculation objects)
  for (let i = 0; i < calcsList.length; i++) {
    // display the answer to the most recent calculation (calcs are unshifted instead of pushed)
    if (i === 0) {
      output.text(calcsList[i].answer);
    }
    // each calculation will be captured as a JQ object so data can be added to it
    let calc = $(`
        <li>${calcsList[i].value1} ${calcsList[i].operation} ${calcsList[i].value2} = ${calcsList[i].answer}</li>
        `);
    // data is added to the calc li
    calc.data("value1", calcsList[i].value1);
    calc.data("value2", calcsList[i].value1);
    calc.data("operation", calcsList[i].operation);
    // append to the DOM
    calcsListOnDOM.append(calc);
  }
}
// clear inputs function
function clearInputs() {
  $("#value1Input").val("");
  $("#value2Input").val("");
  $("#equalBtn").data("operation", "");
}
