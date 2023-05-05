


var timeDisplayEl = $('#time-display');
var past = $('#past-text');
var present = $('#present-text');
var future = $('#future-text');
var advancedFormat = ('dayjs/plugin/advancedFormat')

dayjs.extend(window.dayjs_plugin_advancedFormat)


var timeBlocks = document.querySelectorAll(".time-block");

//this displays the time and uses the advanced format
function displayTime() {

  var rightNow = dayjs().format('dddd, MMM Do, YYYY [at] hh:mm:ss a');

  var currentHour = new Date().getHours();

// Loop through all time blocks

timeBlocks.forEach(function(block) {
  // Extract the hour value from the time block
  var blockHour = parseInt(block.getAttribute("id").split("-")[1]);

  // Compare the current hour with the hour value from the time block
  if (blockHour < currentHour) {
// console.log(blockHour);
// console.log(currentHour);
//used the above code to check if code was updating.
    block.classList.add("past");
  } else if (blockHour === currentHour) {
    block.classList.remove('past');
    block.classList.add("present");
  } else {
    //This will remove past and present and set to future if it is not yet past current hour
    block.classList.remove('past', 'present')
    block.classList.add("future");

  }
});

  timeDisplayEl.text(rightNow);
}

$(function () {
  

 
  $(".saveBtn").on("click", function() {
    // value is the textarea on the HTML we get this because of the .sibling 
    var value = $(this).siblings(".description").val();
    // Key is the div and is targeting the id to get the specific hour
    var key = $(this).parent().attr("id");
    // this will take the hour it was saved on and save the text written
    localStorage.setItem(key, value);
  });
  

 // Loop through each time block div
$(".time-block").each(function() {
  // Get the id of the time block div
  var key = $(this).attr("id");
  // Get the saved value from local storage using the key
  var value = localStorage.getItem(key);
  // If there is a saved value, populate the textarea input field with it
  if (value) {
    $(this).find(".description").val(value);
  }
});

  //Calls the function display time
  displayTime();
//updates the time every second
setInterval(displayTime, 1000);
});

