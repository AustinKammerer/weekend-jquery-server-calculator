$(pageLoad);

function pageLoad() {
  // determine the desired operation
  $(".operatorBtn").on("click", setOperation);
  // calculate the desired operation
  $("#equalBtn").on("click", calculate);
  // clear inputs
  $("#clearBtn").on("click", clearInputs);
  // all clear (inputs and output)
  $("#allClearBtn").on("click", allClear);
  // clear all entries
  $("#entriesClearBtn").on("click", entryClear);
  // initialize DOM
  getCalculations();
  // click listener for entry li elements
  $("#calcsListOnDOM").on("click", ".entry", runEntry);
}

function setOperation() {
  // get data from the btn clicked
  let operation = $(this).data("operation");
  // set equalBtn data-operation to empty string (in case of multiple operatorBtn clicked)
  $("#equalBtn").data("operation", "");
  // set equalBtn data-operation to operation
  $("#equalBtn").data("operation", operation);
  // remove .selected from all other operatorBtns
  $(".operatorBtn").removeClass("selected");
  // add .selected to operatorBtn
  $(this).addClass("selected");
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
    // alert("ENTER VALUE 1");
    // valid = false;
    // if value 1 is not passed, set the input value to the current output
    $("#value1Input").val($("#output").text());
    // and reassign value1
    value1 = $("#value1Input").val();
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
      console.log("GET SUCCESS", res);
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
  //   output.empty();
  $("#calcsListOnDOM").empty();
  // display 0 if there is not a list yet
  if (calcsList.length === 0) {
    $("#output").text("0");
  } else if (calcsList.length !== 0) {
    // display the answer to the most recent calculation (calcs are unshifted instead of pushed)
    $("#output").text(calcsList[0].answer);
    // loop over the server's response (array of calculation objects)
    for (let i = 0; i < calcsList.length; i++) {
      // each calculation will be captured as a JQ object so data can be added to it
      let calc = $(`
        <li class="entry">${calcsList[i].value1} ${calcsList[i].operation} ${calcsList[i].value2} = ${calcsList[i].answer}</li>
        `);
      // data is added to the calc li
      calc.data("value1", calcsList[i].value1);
      calc.data("value2", calcsList[i].value1);
      calc.data("operation", calcsList[i].operation);
      calc.data("index", i);
      // append to the DOM
      $("#calcsListOnDOM").append(calc);
    }
  }
}
// clear inputs function
function clearInputs() {
  $("#value1Input").val("");
  $("#value2Input").val("");
  $("#equalBtn").data("operation", "");
  $(".operatorBtn").removeClass("selected");
}
// function to clear inputs AND reset output to 0
function allClear() {
  clearInputs();
  $("#output").text("0");
}

// function to run an entry from the list
function runEntry() {
  //   $("#value1Input").val($(this).data("value1"));
  //   $("#value2Input").val($(this).data("value2"));
  let index = $(this).data("index");
  $.ajax({
    method: "GET",
    url: `/entry/${index}`,
  })
    .then(function (res) {
      console.log("GET SUCCESS", res);
      $("#value1Input").val(res.value1);
      $("#value2Input").val(res.value2);
      $("#output").text(res.answer);
      $(".operatorBtn").removeClass("selected");
      $(`[data-operation="${res.operation}"]`).addClass("selected");
    })
    .catch(function (err) {
      console.log("GET FAIL", err);
      alert(`SERVER ERROR: ${err.status} (${err.statusText})`);
    });
}

// function to clear all entries, inputs, and reset output to 0
function entryClear() {
  allClear();
  let index = $(this).data("index");
  $.ajax({
    method: "DELETE",
    url: `/entry/${index}`,
  })
    .then(function (res) {
      console.log("DELETE SUCCESS", res);
      getCalculations();
    })
    .catch(function (err) {
      console.log("DELETE FAIL", err);
      alert(`SERVER ERROR: ${err.status} (${err.statusText})`);
    });
}
