import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getUpcomingMovies} from '../api/tmdb-api'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  //movies.sort((a,b)=> parseFloat(b.vote_average) - parseFloat(a.vote_average))

  // Redundant, but necessary to avoid app crashing.
  const watchList = movies.filter(m => m.watchList)
  localStorage.setItem('To Watch', JSON.stringify(watchList))
  const addToWatchList = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />
      }}
    />
);
};

export default UpcomingMoviesPage;


// import React from "react";

// const UpcomingMoviesPage = () => {
//     return <h2>Upcoming Movies</h2>
// }

// export default UpcomingMoviesPage