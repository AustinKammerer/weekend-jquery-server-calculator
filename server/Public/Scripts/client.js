$(pageLoad);

function pageLoad() {
  // determine the desired operation
  $(".operatorBtn").on("click", setOperation);
  // calculate the desired operation
  $("#equalBtn").on("click", calculate);
  // clear inputs
  //   $("clearBtn").on("click", clearInputs);
}

function setOperation() {
  let operation = $(this).data("operation");
  $("#equalBtn").data("operation", operation);
}
// POST function
function calculate() {
  console.log("=");
  // validate inputs
  let value1 = $("#value1Input").val();
  console.log(value1);
  let value2 = $("#value2Input").val();
  console.log(value2);
  let operation = $("#equalBtn").data("operation");
  console.log(operation);
  if (operation === "") {
    alert("SELECT OPERATOR");
  }
  if (value1 === "") {
    alert("ENTER VALUE 1");
  }
  if (value2 === "") {
    alert("ENTER VALUE 2");
  }

  //   switch ("") {
  //     case operation:
  //       console.log("case1");

  //       break;
  //     case value1:
  //       console.log("case2");

  //       break;
  //     case value2:
  //       console.log("case3");

  //       break;
  // case value1 && value2:
  //   alert("ENTER VALUES");
  //   break;

  //   break;

  //   $.ajax({
  //     method: "POST",
  //     url: "/calc",
  //     data: {
  //       value1: value1,
  //       value2: value2,
  //       operation: operation,
  //     },
  //   }).then(function (res) {
  //     getHistory();
  //   });
}

// GET function

// render function

// clear inputs function
