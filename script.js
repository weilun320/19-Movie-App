const movieTitleInput = document.getElementById("movie-title-input");
const resultContainer = document.getElementById("result-container");

async function fetchMovieData(movieTitle) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=258a2345`);
  const data = await response.json();

  return data;
}

function formatMovieData(movieData) {
  const movieTitle = movieData.Title;
  const movieYear = movieData.Year;
  const moviePoster = movieData.Poster;
  const movieDirector = movieData.Director;
  const movieRatings = movieData.Ratings;
  const formattedData = `
    <h2>${movieTitle} (${movieYear})</h2>
    <img alt="" src="${moviePoster}">
    <p>Director: ${movieDirector}</p>
    <p>Rating: ${movieRatings[0].Value}</p>
  `;

  return formattedData;
}

function displayMovieData(movieTitle) {
  fetchMovieData(movieTitle)
  .then((movieData) => {
    const formattedMovieData = formatMovieData(movieData);
    resultContainer.innerHTML = formattedMovieData;
  })
  .catch((error) => {
    resultContainer.innerHTML = "Movie not found!";
  });
}

function searchMovie() {
  const movieTitle = movieTitleInput.value;

  displayMovieData(movieTitle);
}