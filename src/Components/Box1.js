import { useMovies } from "../MovieContext";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Box } from "./Box";
import { SearchResults } from "./SearchResults";

export function Box1() {
  const { err, isLoading } = useMovies();
  return (
    <Box>
      {err ? <ErrorMessage /> : isLoading ? <Loader /> : <SearchResults />}
    </Box>
  );
}
