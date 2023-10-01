export function Movie({
  poster,
  title,
  year,
  runtime,
  imdbRating,
  userRating,
  deleteMovie,
  setSearchMovieID,
  imdbID,
}) {
  return (
    <li
      onClick={() =>
        year ? setSearchMovieID((id) => (id !== imdbID ? imdbID : null)) : null
      }
    >
      <img src={poster} alt="poster"></img>
      <h3>{title}</h3>
      {year ? (
        <p>🗓 {year}</p>
      ) : (
        <div>
          <p>⭐️ {imdbRating}</p>
          <p>🌟 {userRating}</p>
          <p>⏳ {runtime}</p>
          <button className="btn-delete" onClick={deleteMovie}>
            x
          </button>
        </div>
      )}
    </li>
  );
}
