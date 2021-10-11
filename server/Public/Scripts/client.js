$(pageLoad);

function pageLoad() {
  // add inputs to input field
  $(".operatorBtn, .numberBtn").on("click", sendToInput);
  // calculate the desired operation
  $("#equalBtn").on("click", calculate);
  // backspace button
  $("#delBtn").on("click", backspace);
  // clear inputs
  $("#clearBtn").on("click", clearInputs);
  // all clear (inputs and output)
  $("#allClearBtn").on("click", allClear);
  // clear all entries
  $("#entriesClearBtn").on("click", entryClear);
  // click listener for entry li elements
  $("#calcsListOnDOM").on("click", ".entry", runEntry);
  // click listener for entry delete buttons
  $("#calcsListOnDOM").on("click", ".deleteEntry", entryClear);
  // disable keyboard when in input field
  $("#calcInput").keydown(function (event) {
    return false;
  });
  // initialize DOM
  getCalculations();
  allClear();
}

function sendToInput() {
  let input = $("#calcInput");
  if ($(this).data("number")) {
    let num = $(this).data("number");
    input.val(input.val() + num);
  } else if ($(this).data("operation")) {
    let operation = $(this).data("operation");
    // only add an operator if the last input is not also an operator
    if (
      input.val()[input.val().length - 1] !== "+" &&
      input.val()[input.val().length - 1] !== "-" &&
      input.val()[input.val().length - 1] !== "*" &&
      input.val()[input.val().length - 1] !== "/" &&
      !hasOperators(input.val())
    ) {
      if (!input.val()) {
        // forces a first value to be input
        input.val($("#output").text() + operation);
      } else {
        input.val(input.val() + operation);
      }
    } else {
      alert("ONLY ONE OPERATOR PLEASE");
    }
  }
}
// server is only coded for one operation per request
function hasOperators(string) {
  let hasOperators = false;
  let arr = [...string];
  for (let term of arr) {
    if (term === "+" || term === "-" || term === "*" || term === "/") {
      hasOperators = true;
    }
  }
  return hasOperators;
}

// POST function
function calculate() {
  // validate input
  let calcString = $("#calcInput").val();
  let valid = true;
  // input string must not end with an operator
  if (
    calcString[calcString.length - 1] === "+" ||
    calcString[calcString.length - 1] === "-" ||
    calcString[calcString.length - 1] === "*" ||
    calcString[calcString.length - 1] === "/"
  ) {
    alert("ENTER A FINAL VALUE");
    valid = false;
  }
  // only trigger POST if valid is not flipped to false
  if (valid) {
    $.ajax({
      method: "POST",
      url: "/calculate",
      data: {
        calcString: calcString,
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
    url: "/calculate",
  })
    .then(function (res) {
      console.log("GET SUCCESS", res);
      render(res);
      $("#calcInput").val("");
    })
    .catch(function (err) {
      console.log("GET FAIL", err);
      alert(`SERVER ERROR: ${err.status} (${err.statusText})`);
    });
}
// render function
function render(calcsList) {
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
        <li class="entry list-group-item d-flex justify-content-between p-2">
            <div>
                <span>${calcsList[i].value1} ${calcsList[i].operation} ${calcsList[i].value2} = </span> 
                <span class="ansSpan">${calcsList[i].answer}</span>
            </div>
        </li>
        `);
      // data is added to the calc li
      calc.data("value1", calcsList[i].value1);
      calc.data("value2", calcsList[i].value1);
      calc.data("operation", calcsList[i].operation);
      calc.data("index", i);
      // add a delete button
      calc.append(
        `<button class="deleteEntry btn btn-outline-danger ms-2">X</button>`
      );
      // append to the DOM
      $("#calcsListOnDOM").append(calc);
    }
    // $("#ans0").addClass("bold");
    $("#calcsListOnDOM li:nth-child(1)").find(".ansSpan").addClass("fw-bold");
  }
}
// remove active class from entries
function removeActiveClass() {
  let entries = $("#calcsListOnDOM").children("li");
  for (let entry of entries) {
    $(entry).removeClass("active");
  }
}
// clear inputs function
function clearInputs() {
  $("#calcInput").val("");
  removeActiveClass();
}
// function to clear inputs AND reset output to 0
function allClear() {
  clearInputs();
  $("#output").text("0");
  // unbold the entry answer that corresponded to the current output
  let answers = $("#calcsListOnDOM").find("span");
  for (let answer of answers) {
    $(answer).removeClass("fw-bold");
  }
}

function backspace() {
  let input = $("#calcInput");
  let calcString = input.val();
  calcString = calcString.slice(0, -1);
  input.val(calcString);
  removeActiveClass();
}

// function to run an entry from the list
function runEntry() {
  let index = $(this).data("index");
  removeActiveClass();
  // make this the active entry visually
  $(this).addClass("active");
  // make this entry's answer the active one visually (corresponds to the current output on the DOM)
  $(this).find(".ansSpan").addClass("fw-bold");
  if ($(this).attr("class") !== "deleteEntry") {
    $.ajax({
      method: "GET",
      url: `/entry/${index}`,
    })
      .then(function (res) {
        console.log("GET SUCCESS", res);
        $("#calcInput").val(res.calcString);
        $("#output").text(res.answer);
      })
      .catch(function (err) {
        console.log("GET FAIL", err);
        alert(`SERVER ERROR: ${err.status} (${err.statusText})`);
      });
  }
}

// function to clear all entries, inputs, and reset output to 0
function entryClear() {
  //   allClear();
  let index;
  if ($(this).attr("id") === "entriesClearBtn") {
    index = $(this).data("index");
  } else {
    index = $(this).parent("li").data("index");
  }
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
