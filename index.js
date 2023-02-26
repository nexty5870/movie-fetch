let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from API

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  // Error handler field empty
  if(movieName.length <= 0){
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  }
  // field is not empty
  else{
    fetch(url).then((resp) => resp.json()).then((data) => {
      // Movie exist in db
      if(data.Response == "True"){
        result.innerHTML = `
          <div class="info">
            <img src="${data.Poster}" alt="${data.Title} class="poster">
            <div>
              <h2>${data.Title}</h2>
              <div class="ratting">
                <img src="star-icon.svg" alt="star">
                <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
              </div>
              <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
              </div>
            </div>
          </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
        `;
      }

      // Movie does not exist in db
      else{
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })

    // Error handler
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Something went wrong</h3>`;
    })
  }

};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);