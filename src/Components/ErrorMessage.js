import { useMovies } from "../MovieContext";

export function ErrorMessage() {
  const { err } = useMovies();
  return <p className="error">{err}</p>;
}
