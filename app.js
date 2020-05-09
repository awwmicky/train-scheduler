/* -------------------------------------------------------------------------- */
$(() => {
/*  */
// database snapshot
const database = firebase.database();
// console.log(database);

const $viewTrains = $('.view-train-schedule');
const $trainList = $('.train-schedule-list');
const $trainForm = $('.input-train-form');

const $trainName = $('.train-name-input');
const $destination = $('.destination-input');
const $firstTrain = $('.first-train-time-input'); // time
const $frequency = $('.frequency-input'); // intervals

// console.log( moment() );


function nowDateTime() {
    let now = new Date();
    let year = "" + now.getFullYear();
    let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    
    // return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


$trainForm.on('submit', function (e) {
    e.preventDefault();

    let currentTime = nowDateTime();

    let name = $trainName.val();
    $trainName.val("");
    let destn = $destination.val();
    $destination.val("");
    let freq = $frequency.val();
    $frequency.val("");
    let firstTrain = $firstTrain.val();
    $firstTrain.val("");
    // let time = moment(trainTime, "hh:mm");


    database.ref('timestamp').update({
        [currentTime] : {
            "name" : name,
            "destination" : destn,
            "train_time" : firstTrain,
            frequency : freq,

            "dateAdded": firebase.database.ServerValue.TIMESTAMP // creates timestamp
        }
    });

    $trainList.empty();

    database.ref('timestamp')
    .orderByChild("dateAdded")
    // .endAt()
    // .limitToLast(1)
    .on('child_added', c_snap => {
        let data = c_snap.val();
        console.log( data.name );

/* -------------------------------------------------------------------------- */
var convertedTime = moment(data.train_time, "HH:mm")
                    // .add(8, "minutes");
                    .subtract(1, "years");

console.log(convertedTime);
// var currentTime = moment();
// console.log("Current Time: " + currentTime.format("HH:mm"));
var tDifference = moment().diff(moment(convertedTime), "minutes");
console.log(tDifference, " - total mins");

var tRemainder = tDifference % data.frequency;
console.log(tRemainder, " - remaining");

var tRemainingToNextTrain = data.frequency - tRemainder;
console.log("Minutes till next train: ", tRemainingToNextTrain);

var timeOfNextTrain = moment().add(tRemainingToNextTrain, "minutes");
console.log("Next arrival: ", moment(timeOfNextTrain).format("HH:mm"));
/* -------------------------------------------------------------------------- */

        $trainList.append(
        `<tr>
            <td>${data.name}</td>
            <td>${data.destination}</td>
            <td>${data.frequency} mins</td>
            <td>${timeOfNextTrain.format("HH:mm")}</td>
            <td>${tRemainingToNextTrain} min</td>                
            <td>
                <button>
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button>
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>`
        );
    });
});
// Object.keys( snap.val() )

/* -------------------------------------------------------------------------- */

});


/* 
- .orderByChild([target obj key])
    - for loop each item
- .on(["child_added"], fn(snap)
    - same as on "value"
- .limitToLast(1)
    - .limit()
    - get the last data
- .child()
*/
/* 
- track things added from last checkpoint
- without fetching previous records
    - use endAt() and limit()
*/


/* 
- create Firebase event for new data
    - data bind data_child
*/

/* 
Consider adding ".indexOn": "dateAdded" at /timestamp to your security rules for better performance. 
*/
