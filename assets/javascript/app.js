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

// initial value
var train = {
	name: "",
	destination: "",
	firstTime: "",
	frequency: 0,
	dateAdded: firebase.database.ServerValue.TIMESTAMP
}

// event listener for submit button click
$("#submitbtn").on("click", function()
{
	
	console.log("button clicked");

	train.name = $("#train-name-input").val().trim();
	train.destination = $("#destination-input").val().trim();
	train.firstTime = $("#first-time-input").val().trim();
	train.frequency = $("#frequency-input").val().trim();

	console.log("train: " + JSON.stringify(train));
	
    // Save new value to Firebase
	database.ref().push(train);

	// Don't refresh the page!
	return false;
});


// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
// console.log(firstTimeConverted);



// take data input by admin

// convert time input as needed

// store as root variable in the firebase, make sure you are appending into the database

// extract the latest addition and display in the train schedule

// sort the train times by soonest,  to later

//  display 10 trains at once


// event lister for the search button
    // $("#search").on('click', function() {

// function searchNYT(){
// // build the queryURL
// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5aa79c02ea5840d28aa684eed86fe61c&q=" + searchTerm
// + "&begin_date=" + beginDate + "&end_date=" + endDate + "&page=0&h1=true";

// //build ajax call
// $.ajax ({url: queryURL, method: "GET"})
// .done(function(NYTData){
// 	console.log(NYTData.response.docs);



// 	for (var i = 0; i<numResults; i++) {

// 		var resultDiv = $("<div>");
// 		var pHeadline = $('<h1>').text(NYTData.response.docs[i].headline.highlight);
// 		var pByline = $('<h2>').text(NYTData.response.docs[i].byline.original);
// 		var pSection = $('<h2>').text(NYTData.response.docs[i].section_name);
// 		var pDate = $('<h2>').text(NYTData.response.docs[i].pub_date);
// 		var pURL = $('<h2>').text(NYTData.response.docs[i].web_url);

// 		resultDiv.append(pHeadline).append(pByline).append(pSection).append(pDate).append(pURL);

// 		// NEED to take resultDiv and append into the container div where results appear

// 		$(".results").append(resultDiv);
// 	}




// });





