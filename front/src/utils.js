export async function fetchPlot(movie) {
  try {
    const res = await fetch('http://localhost:5000/get_plot', {
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
    return res;
  } catch (error) {
    console.error(error);
  }
}
