$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();
    });
  });
  
  function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=8e13606c&s='+searchText)
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
              <div class="card" style="height: 22rem;">
                <img src="${movie.Poster}">
                <h5 class="primary-text">${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-warning" href="#">Movie Details</a>
              </div>
              </div>
            </div>
          `;
        });
  
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }
  
  function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
  
    axios.get('http://www.omdbapi.com/?apikey=8e13606c&i='+movieId)
      .then((response) => {
        console.log(response);
        let movie = response.data;
  
        let output =`
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2 class="primary-text">${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item primary-text"><strong>Genre:</strong><span class="white"> ${movie.Genre} </span></li>
                <li class="list-group-item primary-text"><strong>Released:</strong><span class="white"> ${movie.Released} </span></li>
                <li class="list-group-item primary-text"><strong>Rated:</strong><span class="white"> ${movie.Rated} </span></li>
                <li class="list-group-item primary-text"><strong>IMDB Rating:</strong><span class="white"> ${movie.imdbRating} </span></li>
                <li class="list-group-item primary-text"><strong>Director:</strong><span class="white"> ${movie.Director} </span></li>
                <li class="list-group-item primary-text"><strong>Writer:</strong><span class="white"> ${movie.Writer} </span></li>
                <li class="list-group-item primary-text"><strong>Actors:</strong><span class="white"> ${movie.Actors} </span></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3 class="primary-text">Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-warning">View IMDB</a>
              <a href="movies.html" class="btn btn-outline-warning">Go Back To Search</a>
            </div>
          </div>
        `;
  
        $('#movie').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }