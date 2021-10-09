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
        getHistory();
      })
      .catch(function (err) {
        alert("SERVER ERROR: " + err.message);
      });
  }
}

// GET function

// render function

// clear inputs function
function clearInputs() {
  $("#value1Input").val("");
  $("#value2Input").val("");
  $("#equalBtn").data("operation", "");
}
