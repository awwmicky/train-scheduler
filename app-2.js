/* 
- 00:[]
    - min: 00 & max: 60
- []:00
    - min: 00 & max: 24
*/


// assumption
let tFrequency = 3;
// let firstTime = "03:30";
let firstTime = 1600;

let time = moment(firstTime, 'HH:mm')
// .format("HH:mm");
console.log(time);

var tDifference = moment().diff(moment(time, 'minute'));
console.log(tDifference, " - total mins");

var tRemainder = tDifference % tFrequency;
console.log(tRemainder, " - remaining");

var tRemainingToNextTrain = tFrequency - tRemainder;
console.log("Minutes till next train: ", tRemainingToNextTrain);


// convert 4 digits as military time to western time
/* 
let time = new Date(firstTime)

console.log( [time] );

function convert(time) {
    // var hours = Math.floor(time / 60);
    let hours = Math.floor(time / 3600);
    let hoursInt = parseInt(hours, 10)
    let am_pm = (hours >= 12) ? "PM" : "AM";
    var minutes = time % 60;
    minutes = (minutes < 10) ? ("0" + minutes) : minutes;
 
    // return hrs + ":"+ minutes + " " + ampm;
    console.log(`${hours}:${minutes} ${am_pm}`);
    
}
 */
$('.submit-btn').on('click', function(e) {
    e.preventDefault();
    let setTime = $('.first-train-time-input').val();
    convert(setTime);
});

/* -------------------------------------------------------------------------- */

// var update = function () {
//     date = moment(new Date())
//     datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
// };

// $(document).ready(function(){
//     datetime = $('#displayCurrentTime')
//     update();
//     setInterval(update, 1000);
// });