// wait for DOM to load before running JS that uses DOM elements
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is connected to HTML, and DOM is ready!');

  // form to search spotify API
  var $spotifySearch = $('#spotify-search');

  // input field for track (song)
  var $track = $('#track');

  // element to hold results from spotify API
  var $results = $('#results');

  // loading gif
  var $loading = $('#loading');

  var source = $('#tracks-template').html();
  console.log('template script source:', source);
  var template = Handlebars.compile(source);


  // submit form to search spotify API
  $spotifySearch.on('submit', function(event) {
    event.preventDefault();

    // empty previous results
    $results.empty();

    // save form data to variable
    var searchTrack = $track.val();
    
    // only search if the form has a keyword to search with!
    if (searchTrack !== ""){
      // show loading gif
      $loading.show();

      // spotify search URL
      var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

      // use AJAX to call spotify API
      $.ajax({
        method: 'GET',
        url: searchUrl,
        success: handleSpotifyData // see this function defined below
      });
    } else {
      // remind the user to enter a keyword
      // one way is a "quick and ugly" alert
      alert("Enter a keyword to search!");
    }

    // reset the form
    $spotifySearch[0].reset();
    // give focus back to track name field
    $track.focus();
  });


  // handles results received from spotify
  function handleSpotifyData(spotifyResults) {
    console.log("received results:", spotifyResults);

    // track results are in an array called `items`
    // which is nested in the `tracks` object
    var trackResults = spotifyResults.tracks.items;
    console.log('search result tracks:', trackResults);

    // hide loading gif
    $loading.hide();

 
      

      
      var trackHtml = template({ tracks: trackResults });
      console.log(trackHtml);
      $('#results').append(trackHtml);
  }

});
