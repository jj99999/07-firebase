  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAC2L4HRVKFAOamG6sc9n33v0avS88DQi0",
    authDomain: "trainschedule-ff83b.firebaseapp.com",
    databaseURL: "https://trainschedule-ff83b.firebaseio.com",
    storageBucket: "trainschedule-ff83b.appspot.com",
    messagingSenderId: "184591177331"
  };
  firebase.initializeApp(config);


// Variable to reference the database
var database = firebase.database();

var now=new Date();

console.log(now);

// initial value
var train = {
	name: "",
	destination: "",
	firstTime: 0,
	frequency: 0,
	dateAdded: 0
};

// event listener for submit button click
$("#submitbtn").on("click", function()
{
	train.name = $("#train-name-input").val().trim();
	train.destination = $("#destination-input").val().trim();
	train.firstTime = $("#first-time-input").val().trim();
	train.frequency = $("#frequency-input").val().trim();
	train.dateAdded = firebase.database.ServerValue.TIMESTAMP;

	console.log("train: " + JSON.stringify(train));
	
    // Save new value to Firebase
	database.ref().push(train);

	// clear form fields
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-time-input").val("");
	$("#frequency-input").val("");

	// Don't refresh the page
	return false;
});



//  display 10 trains at once



database.ref().on("child_added", function(childSnapshot, prevChildKey)
{

	console.log(childSnapshot.val());

	var newName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().destination;
	var newFirsttime = childSnapshot.val().firstTime;
	var newFrequency = childSnapshot.val().frequency;

	// current time
	var timeNow = moment().format("hh:mm");
	console.log(timeNow);
	console.log(newFirsttime);

	//convert first train time to localized format
	var firstTimeconverted = moment(newFirsttime,"LT");

	// difference in minutes  between time of first train and the current time
	var diffMins = moment().diff(moment(firstTimeconverted), "minutes");

	// find out whether the difference in minutes is more than the frequency,  i.e. there is an additional train arriving within that window
	var remainder = diffMins % newFrequency;

	//if the first train has already arrived, subtract the remainder from the frequency rate to get the time remaining before the next train
	var nextTraintime = newFrequency-remainder;
	console.log("Time to Next 1: "+nextTraintime);

	//if the first train has not arrived yet, take the time of the first train and find the difference between now and the arrival time in minutes
	var nextTraintime2 = moment(firstTimeconverted).diff(moment(), "minutes");
	console.log("Time to Next 2: "+nextTraintime2);


	//var for storing the time until the next train arrives
	var nextMins = 0;

	// if the time until the first train arrival is negative, that means the train has not arrived yet -- so store the nextTraintime2 minutes from above
	if (diffMins<0){
		nextMins=nextTraintime2+1;
	}

	//  else,  use the nextTraintime  minutes calculated above when the first train has already arrived
	else {
		nextMins=nextTraintime;
	}


	//variables used to store the arrival time of the next train

	//if the first train has not arrived yet,  convert the first train time into hh:mm with am/pm
	var firstTrain = moment(firstTimeconverted).format("hh:mm a");
	console.log("Next Train Arrival 2: "+firstTrain);

	// if not, get the moment-now  and add in the minutes until that train arrives
	var nextMins = moment().add(nextTraintime, "minutes")
	// convert that time into hh:mm format, with am/pm
	var nextTraintimeconverted = moment(nextMins).format("hh:mm a");


	// variable to store the arrival time of the very next train to arrive (of all the trains)
	var next2arrive;

	if (diffMins<0){
		next2arrive=firstTrain;
	}else {
		next2arrive=nextTraintimeconverted;
	};

	//variable to store the # of minutes from now until the next train arrives
	var minutesAway;

	if (timeNow==next2arrive){
		minutesAway="00";
	}else {
		minutesAway=nextTraintime;
	};


	$("#schedule > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + next2arrive + "</td><td>" + minutesAway + "</td><td>");

});





