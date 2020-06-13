const userBirthdayInput = document.getElementById('userBirthdayInput');

$(document).ready(function(){
  
  // Search Function
  function userSearch () {
    // Top Movie of Birth Year
    let userBirthYear = $("#searchInput").val().slice(-4); // Choosing Last 4 characters of user input
    let topMovie = movieList[0][userBirthYear];
    $("#topMovie").empty(); // Protection from overflow
    $("#topMovie").append("Top Movie From Your Birth Year: <br>" + topMovie);

    // API fetch for Poster
    let movieURL = "http://www.omdbapi.com/?t=" + topMovie + "&apikey=dd89f250"
    $.ajax({
      url: movieURL,
      method: "GET"  
    })
      .then(function(response){
        $("#topMovie").append("<br><img src='" + response.Poster + "'/>")
    });
  };

  // Event Listeners For Search Call. Works on entire input area. 
  // User can press Enter or click on search button
  $(userBirthdayInput).submit(function(){
    event.preventDefault();
    userSearch();
  });
});