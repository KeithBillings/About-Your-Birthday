const userBirthdayInput = document.getElementById('userBirthdayInput');
const searchButton = document.getElementById('searchButton');

$(document).ready(function(){

  // Search Function
  function userSearch () {
    // This will the be the function that will fetch API data and such
    event.preventDefault();
    console.log("test");
  };



  // Event Listeners For Search 
  $(userBirthdayInput).submit(function(){
    userSearch();
  });
  $(searchButton).click(function(){
    userSearch();
  });
});