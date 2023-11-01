export default function Movie({movie}) {
  return (
     <article className="bg-blue-100 w-[30vw]">
              <a href={`movie-details.html?id=${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title}`}
                  />
                ) : (
                  <img
                    src="./assets/images/No-Image.jpg"
                    alt={`${movie.title}`}
                  />
                )}
              </a>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    Premiär datum: {movie.release_date}
                  </small>
                </p>
              </div>
            </article>
  );
}