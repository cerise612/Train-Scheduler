var config = {
    apiKey: "AIzaSyDdPqH9jumIOBmRvqUThwrTaI8UGYTNXJ0",
    authDomain: "myawesomeproject-75453.firebaseapp.com",
    databaseURL: "https://myawesomeproject-75453.firebaseio.com",
    projectId: "myawesomeproject-75453",
    storageBucket: "myawesomeproject-75453.appspot.com",
    messagingSenderId: "704999435840",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#clear-button").on("click", function(){
    $("#submitName").val("");
    $("#submitDestination").val("");
    $("#submitStartTime").val("");
    $("#submitFrequency").val("");
});
var trainName = $("#submitName").val().trim();
var destination = $("#submitDestination").val().trim();
var firstTrain = $("#submitStartTime").val().trim();
var frequency = $("#submitFrequency").val().trim();

  $("#submit-button").on("click", function () {
      trainName = $("#submitName").val().trim();
      destination = $("#submitDestination").val().trim();
      firstTrain = $("#submitStartTime").val().trim();
      frequency = $("#submitFrequency").val().trim();
   
        database.ref().push({
          TrainName: trainName,
          Destination: destination,
          FirstTime: firstTrain,
          Frequency: frequency,
          
        });
        
        // console.log(TrainName.trainName);
        // console.log(snapshot.val().destination);
        // console.log(snapshot.val().enteredFirstTime);
        // console.log(snapshot.val().enteredFrequency);

      
      });

    var newTrain = {

      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
    };
  
    // // Uploads train data to the database
    // database.ref().push(newTrain);
  
  
     
        // Frequency entered by user
        var tFrequency = newTrain.frequency;

        // Time is entered by user
        var firstTime = newTrain.firstTrain;
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Change the HTML to reflect

        var tBody = $("#table-results");
        var tRow = $("<tr>");
        
        var colName = $("<td>").text(trainName);
        var colDestination = $("<td>").text(destination);
        var colFrequency = $("<td>").text(tFrequency);
        var colNextArrival = $("<td>").text(nextTrain);
        var colMinutesAway = $("<td>").text(tMinutesTillTrain);
  
        
        tRow.append(colName, colDestination, colFrequency, colNextArrival, colMinutesAway);
        tBody.append(tRow);
        
        
       
        


