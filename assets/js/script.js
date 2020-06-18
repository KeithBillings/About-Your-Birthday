const userBirthdayInput = document.getElementById('userBirthdayInput');
const birthDayEl = $("#searchInput").val();

$(document).ready(function () {
  // Search Function
  function userSearch() {
    // User Birthdate Variables 06/01/1989
    const userBirthObj = {
      userBirthMonth: $("#searchInput").val().slice(0, 2),
      userBirthDay: $("#searchInput").val().slice(3, 5),
      userBirthYear: $("#searchInput").val().slice(-4)
    }
    // Choosing Last 4 characters of user input

    // Top Movie of Birth Year
    let topMovie = movieList[0][userBirthObj.userBirthYear];
    $("#topMovie").empty(); // Protection from overflow
    $("#topMovie").append("Top Movie From Your Birth Year: <br>" + topMovie);

    // API fetch for Poster
    let movieURL = "https://www.omdbapi.com/?t=" + topMovie + "&apikey=dd89f250"
    $.ajax({
      url: movieURL,
      method: "GET"
    })
      .then(function (response) {
        $("#topMovie").append("<br><center><img src='" + response.Poster + "'/>" + "</center>")
      });

    // Famouse Celebrities API
    $.ajax({
      url: 'https://raw.githubusercontent.com/alebelcor/celeb-birthdays/master/output/celeb-birthdays.json',
      method: "GET"
    }).then(function(people) {
      people = JSON.parse(people);
      var matchingPeople = people[$("#searchInput").val().slice(0, 2) + '-' + $("#searchInput").val().slice(3, 5)];
      console.log(matchingPeople);
      $("#famousCelebrities").html("Celebrity's you share a birthday with: ");
        // loop used to display each celebrity on html
      for (var i = 0; i < matchingPeople.length; i++) {
        // add each person to html
        console.log(matchingPeople[i]);
        $("#famousCelebrities").append('<p>' + '<b>'+ matchingPeople[i] + '</b>'+'</p>');
      }
    });
    
    // Zodiac Query

    const zodiacResult = getZodiac(userBirthObj)

    // Horoscope / Zodiac Sign API

    const isShowHoroscope = document.getElementById('horoscope').checked
    const isShowNasa = document.getElementById('nasaAPI').checked
    const isShowMovie = document.getElementById('topMovieThatYear').checked
    const isShowCelebrity = document.getElementById('famousCelebs').checked

    // Shows / hides elements
    if (isShowHoroscope) {
      getHoroscope(zodiacResult);
      $("#horoscopeEl").show();
    } else {
      getHoroscope(zodiacResult);
      $("#horoscopeEl").hide();
    }

    if (isShowNasa) {
      getNASAimg(userBirthObj);
      $("#nasaAPIEl").show();
    } else {
      getNASAimg(userBirthObj);
      $("#nasaAPIEl").hide();
    }

    if (isShowMovie) {
      $("#topMovie").show();
    } else {
      $("#topMovie").hide();
    }

    if (isShowCelebrity) {
      $("#famousCelebrities").show();
    } else {
      $("#famousCelebrities").hide();
    }
  };

  // Event Listeners For Search Call. Works on entire input area. 
  // User can press Enter or click on search button
  $(userBirthdayInput).submit(function () {
    event.preventDefault();
    userSearch();
  });
});

function getZodiac(userBirthObj) {

  // convert to integer 
  const userBirthMonth = parseInt(userBirthObj.userBirthMonth);
  const userBirthDay = parseInt(userBirthObj.userBirthDay);

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
  return zodiacResult
}


async function getNASAimg({ userBirthDay, userBirthMonth }) {
  let nasaAPIKey = "4tebK7RiSEiz7RxmDNytqxAa7eayjAAJdQibOqis";
  let nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${nasaAPIKey}&date=${'2019'}-${userBirthMonth}-${userBirthDay}`
  const response = await fetch(nasaURL);
  const data = await response.json();
  let { url, title, media_type, explanation } = data;

  if (media_type === "image" && media_type !== "video") {
    return $('#nasaAPIEl').html("<b>Last Year On Your Birthday Space Looked Like:</b> <br>" + title + "<center><img src=" + url + " />" + "<br><br>" + "</center><div></div>" + explanation);
  }
  if (media_type === "video" && media_type !== "image") {
    return $('#nasaAPIEl').html("<b>Last Year On Your Birthday Space Looked Like:</b> <br>" + title + "<iframe width='360', height='215', src=" + url + ">" + "</iframe>" + "<br><br>" + "<div></div>" + explanation);
  }
}


async function getHoroscope(zodiacResult) {
  const horoscopeURL = ("http://sandipbgt.com/theastrologer/api/horoscope/" + zodiacResult + "/today/")
  const response = await fetch(horoscopeURL);
  const data = await response.json();
  const { sunsign, horoscope, meta } = data;

  $('#horoscopeEl').html("<b>Your Sunsign is:</b> " + sunsign + "<br>" + "<b>Horoscope:</b><br>" + horoscope + "<br><br>" + "<b>Mood:</b> " + meta.mood + "<div><b>Keywords:</b></div> " + meta.keywords);
}
