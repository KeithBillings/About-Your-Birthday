const userBirthdayInput = document.getElementById('userBirthdayInput');

// Show Element
function showHiddenEl(element) {
  if (document.querySelector("input:checked")) {
    element = $(element).removeClass("hiddenEl");
    element = $(element).addClass('visibleEl');
    return element;
  }
  else {
    return $(element).addClass('hiddenEl');
  }
};

$(document).ready(function () {
  // Search Function
  function userSearch() {
    // User Birthdate Variables
    let userBirthMonth = +($("#searchInput").val().slice(0, 2));
    let userBirthDay = +($("#searchInput").val().slice(3, 5));
    let userBirthYear = +($("#searchInput").val().slice(-4)); // Choosing Last 4 characters of user input

    // Top Movie of Birth Year
    let topMovie = movieList[0][userBirthYear];
    $("#topMovie").empty(); // Protection from overflow
    $("#topMovie").append("Top Movie From Your Birth Year: <br>" + topMovie);

    // API fetch for Poster
    let movieURL = "https://www.omdbapi.com/?t=" + topMovie + "&apikey=dd89f250"
    $.ajax({
      url: movieURL,
      method: "GET"
    })
      .then(function (response) {
        $("#topMovie").append("<br><img src='" + response.Poster + "'/>")
      });

    // Zodiac Query
    let zodiacResult = "";

    if ((userBirthDay >= 21 && userBirthMonth === 01) || (userBirthDay <= 19 && userBirthMonth === 02)) {
      zodiacResult = (zodiacSign[0]);
    }
    if ((userBirthDay >= 20 && userBirthMonth === 02) || (userBirthDay <= 20 && userBirthMonth === 03)) {
      zodiacResult = (zodiacSign[1]);
    }
    if ((userBirthDay >= 21 && userBirthMonth === 03) || (userBirthDay <= 20 && userBirthMonth === 04)) {
      zodiacResult = (zodiacSign[2]);
    }
    if ((userBirthDay >= 21 && userBirthMonth === 04) || (userBirthDay <= 21 && userBirthMonth === 05)) {
      zodiacResult = (zodiacSign[3]);
    }
    if ((userBirthDay >= 22 && userBirthMonth === 05) || (userBirthDay <= 21 && userBirthMonth === 06)) {
      zodiacResult = (zodiacSign[4]);
    }
    if ((userBirthDay >= 22 && userBirthMonth === 06) || (userBirthDay <= 22 && userBirthMonth === 07)) {
      zodiacResult = (zodiacSign[5]);
    }
    if ((userBirthDay >= 23 && userBirthMonth === 07) || (userBirthDay <= 23 && userBirthMonth === 08)) {
      zodiacResult = (zodiacSign[6]);
    }
    if ((userBirthDay >= 24 && userBirthMonth === 08) || (userBirthDay <= 23 && userBirthMonth === 09)) {
      zodiacResult = (zodiacSign[7]);
    }
    if ((userBirthDay >= 24 && userBirthMonth === 09) || (userBirthDay <= 23 && userBirthMonth === 10)) {
      zodiacResult = (zodiacSign[8]);
    }
    if ((userBirthDay >= 24 && userBirthMonth === 10) || (userBirthDay <= 22 && userBirthMonth === 11)) {
      zodiacResult = (zodiacSign[9]);
    }
    if ((userBirthDay >= 23 && userBirthMonth === 11) || (userBirthDay <= 21 && userBirthMonth === 12)) {
      zodiacResult = (zodiacSign[10]);
    }
    if ((userBirthDay >= 22 && userBirthMonth === 12) || (userBirthDay <= 20 && userBirthMonth === 01)) {
      zodiacResult = (zodiacSign[11]);
    }

    console.log(zodiacResult);

    //Trying new XMLrequest
    // var data = null;

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("GET", "https://zodiac-sign.p.rapidapi.com/signs");
    // xhr.setRequestHeader("x-rapidapi-host", "zodiac-sign.p.rapidapi.com");
    // xhr.setRequestHeader("x-rapidapi-key", "SIGN-UP-FOR-KEY");

    // xhr.send(data);
    let horoscopeURL = ("https://sandipbgt.com/theastrologer/api/horoscope/" + zodiacResult + "/today/")
    // let zodiacURL = ("https://zodiacal.herokuapp.com/" + zodiacResult)
    //console.log(horoscopeURL);
    
    async function getHoroscope() {
      $("#horoscopeEL").empty();
      const response = await fetch(horoscopeURL);
      const data = await response.json();
      const { sunsign, horoscope, meta } = data;

      $('#horoscopeEl').append("<b>Your Sunsign is:</b> " + sunsign + "<br>" + "<b>Horoscope:</b><br>" + horoscope + "<br><br>" + "<b>Mood:</b> " + meta.mood + "<div><b>Keywords:</b></div> " + meta.keywords);
      console.log(sunsign);
      console.log(horoscope);
      console.log(meta);
    }
    getHoroscope();
    
    // $.ajax({
    //   url: horoscopeURL,
    //   method: "GET /api/horoscope/{sunsign}/today"
    // }).then(function(response) {
    //   $("#horoscopeEl").append("Your Horoscope Today: <br>" + response.json());
    //   console.log(response);
    // });
    
    
    // $.ajax({
    //   beforeSend: function (xhr) {
    //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //   },
    //   url: zodiacURL,
    //   headers: {"Access-Control-Allow-Methods": "*",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": "false",
    //   },
    //   method: "GET"
    // }).then(function(response){
    //   console.log("response", response)
    // })

  };

  // Event Listeners For Search Call. Works on entire input area. 
  // User can press Enter or click on search button
  $(userBirthdayInput).submit(function () {
    event.preventDefault();
    userSearch();
    showHiddenEl($("#topMovie"));
    showHiddenEl($("#horoscopeEl"));
    // showHiddenEl($("#gifEl"));
    // showHiddenEl($("#weatherEl"));
    // showHiddenEl($("#dailyJokeEl"));
    // showHiddenEl($("#musicReleasedEl"));

  });
});