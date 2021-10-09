$(pageLoad);

function pageLoad() {
  // determine the desired operation
  $(".operatorBtn").on("click", setOperation);
  // calculate the desired operation
  $("#equalBtn").on("click", calculate);
}

function setOperation() {
  let operation = $(this).data("operation");
  $("#equalBtn").data("operation", operation);
}
