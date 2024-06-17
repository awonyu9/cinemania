export async function fetchMovieDetails(movieId) {
  try {
    return await fetch('http://localhost:5000/get_movie_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ movie_id: movieId }),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPlot(movie) {
  try {
    return await fetch('http://localhost:5000/get_plot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        movie_title: movie.title,
        movie_year: movie.year,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchQuiz(movieTitle, moviePlot) {
  try {
    return await fetch('http://localhost:5000/get_quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        movie_title: movieTitle,
        plot: moviePlot,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
