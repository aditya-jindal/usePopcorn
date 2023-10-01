import { useMovies } from "../MovieContext";

export function Summary() {
  const { moviesWatched } = useMovies();
  const len = moviesWatched?.length ?? 0;
  return (
    <div className="summary">
      <h2>MOVIES YOU WATCHED</h2>
      <div>
        <p>#️⃣{len} movies</p>
        <p>
          ⭐️
          {Number(
            moviesWatched?.reduce(
              (acc, obj) => acc + obj.imdbRating / len,
              0
            ) ?? 0
          ).toFixed(2)}
        </p>
        <p>
          🌟
          {Number(
            moviesWatched?.reduce(
              (acc, obj) => acc + obj.userRating / len,
              0
            ) ?? 0
          ).toFixed(2)}
        </p>
        <p>
          ⏳
          {Number(
            moviesWatched?.reduce(
              (acc, obj) => acc + parseInt(obj.Runtime) / len,
              0
            ) ?? 0
          ).toFixed(0)}
          min
        </p>
      </div>
    </div>
  );
}
