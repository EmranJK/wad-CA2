import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchList from "../components/cardIcons/removeFromWatchList";
//import WriteReview from "../components/cardIcons/writeReview";

const WatchListPage = () => {
  const {watchList: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchListMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchListMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = watchListMovieQueries.map((q) => q.data);
  const toDo = () => true;

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      // <WriteReview movie={movie} /> put this in the return statement
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchList movie={movie} />
            
          </>
        );
      }}
    />
  );
};

export default WatchListPage;