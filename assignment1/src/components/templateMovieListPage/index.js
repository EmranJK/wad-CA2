import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function MovieListPageTemplate({ movies, title, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const genreId = Number(genreFilter);
  const ratingValue = Number(ratingFilter);
  const [sortMovies, setSortMovies] = useState("")

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
     // genreId > 0 ? m.genre_ids.includes(genreId) : true;
      return ratingValue > 0 ? parseInt(m.vote_average) == ratingValue : true;
    });
    
  if (sortMovies === "ON"){
    displayedMovies.sort((a,b)=> parseFloat(b.vote_average) - parseFloat(a.vote_average))
  }
  
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sorting") setSortMovies(value);
    else setGenreFilter(value);
  };




  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;

  /////

  // function MovieListPageTemplate2({ movies, title, action }) {
  //   const classes = useStyles();
  //   const [nameFilter, setNameFilter] = useState("");
  //   const [rateFilter, setRateFilter] = useState("0");
  //   const rateId = Number(rateFilter);
  
  //   let displayedMovies = movies
  //     .filter((m) => {
  //       return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
  //     })
  //     .filter((m) => {
  //       return rateId > 0 ? m.rate_ids.includes(rateId) : true;
  //     });
  
  //   const handleChange = (type, value) => {
  //     if (type === "name") setNameFilter(value);
  //     else setRateFilter(value);
  //   };

  // }
  /////

