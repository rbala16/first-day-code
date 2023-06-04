// my APIKey is "b4ed94adc674507878b0aeb7f93e988b";
var enterCityName = $("#cityName");
var confirmAppointment = $("#confirm");
var holidayName = $("#holiday-name")
var holidayDate = $("#holiday-date")
var DateofAppointment = $("#Date-of-Appointment")

$(document).ready(function(){
  //event listener on search button
confirmAppointment.on("click",function(){
  //get value in input search value
  var searchCity = enterCityName.val();
  enterCityName.val(" ");
  
  weatherForecast(searchCity);
  canadianholidays();
});

//The keypress event is fired when a key that produces a character value is pressed down.
confirmAppointment.keypress(function(event){
  var keycode = (event.keycode ? event.keycode : event.which);
  if(keycode === 13)
  {
    
    weatherForecast(searchCity);
    canadianholidays();
  }
})


// function weatherForecast(searchTerm) 
function weatherForecast(searchCity) {
 
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=b4ed94adc674507878b0aeb7f93e988b&units=imperial")
  .then(function(response){
    return response.json();
  })

.then(function (data) {
  console.log(data);
  $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

  //loop to create a new card for 5 days weather forecast`
  for (var i = 0; i < data.list.length; i++) {

    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

      var titleFivedays = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
      var imgFivedays = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
      var colFivedays = $("<div>").addClass("col-md-2.5");
      var cardFivedays = $("<div>").addClass("card bg-primary text-white");
      var cardBodyFivedays = $("<div>").addClass("card-body p-2");
      var windFivedays = $("<p>").addClass("card-text").text("Wind: " + data.list[i].wind.speed + " MPH");
      var humidFivedays = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
      var tempFivedays = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
  

      //combine together and display on page
      colFivedays.append(cardFivedays.append(cardBodyFivedays.append(titleFivedays, imgFivedays, tempFivedays, humidFivedays,windFivedays)));
      //append card to column, body to card, and other elements to body
      $("#forecast .row").append(colFivedays);
    }
  }
});
}
function canadianholidays(){
  fetch("https://canada-holidays.ca/api/v1/holidays?year=2023")
  .then(function(response){
    return response.json();

  })

  .then(function(data){
    for (i=0; i<data.holidays.length;i++){
      console.log("Date:", data.holidays[i].date)
      console.log("Holiday Name:", data.holidays[i].nameEn);
//       var canholi = $("<div>").addClass("col-md-2.5");
//       var holidays = $("<p>").addClass("card-text").text("Wind: " + data.holidays[i].date);
//       var canadianholidays = $("<p>").addClass("card-text").text("Humidity: " + data.holidays[i].nameEn);
// canholi.append(canadianholidays,holidays);

      //console.log("Date:", data.holidays[i]./*different property name here*/);
     
      var winddays = $("<p>").text("Date :" + data.holidays[i].date );
      var humiddays = $("<p>").text("Holiday Name :" + data.holidays[i].nameEn);
     if(DateofAppointment === data.holidays[i].date){
      alert("Holiday,check anotherv date");
      canadianholidays();
   
    }
  
  }
   
  })
}
})