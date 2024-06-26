import React from "react";  // useState/useEffect redundant
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "rgb(204, 204, 0)",
  },
  media: { height: 300 },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

export default function FilterMoviesCard(props) {
  const classes = useStyles();
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.results;
  genres.unshift({ id: "0", name: "All" });

  const rating = ['All', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const sorting = ['ON', 'OFF'];


  const language = ['English', 'Spanish'];

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleChange(e, "rating", e.target.value);
  };

  const handleLanguageChange = (e) => {
    handleChange(e, "language", e.target.value);
  };


  const handleSortingChange = (e) => {
    handleChange(e, "sorting", e.target.value);
  };

  return (
    <Card className={classes.root} variant="outlined" style = {{background: "#9198e5"}}>
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
        className={classes.formControl}
        id="filled-search"
        label="Search field"
        type="search"
        value={props.titleFilter}
        variant="filled"
        onChange={handleTextChange}
      />
        <FormControl className={classes.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
          labelId="genre-label"
          id="genre-select"
          value={props.genreFilter}
          onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


        <FormControl className={classes.formControl}>
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
          labelId="rating-label"
          id="rating-select"
          value={props.ratingFilter}
          onChange={handleRatingChange}
          >
            {rating.map((r) => {
              return (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


        <FormControl className={classes.formControl}>
          <InputLabel id="sorting-label">Sorting</InputLabel>
          <Select
          labelId="sorting-label"
          id="sorting-select"
          value={props.sortingFilter}
          onChange={handleSortingChange}
          >
            {sorting.map((r) => {
              return (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="lanuguage-label">Languages</InputLabel>
          <Select
          labelId="language-label"
          id="language-select"
          value={props.lanuguageFilter}
          onChange={handleLanguageChange}
          >
            {language.map((r) => {
              return (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


      </CardContent>
      <CardMedia
        className={classes.media}
        image={img}
        title="Filter"
      />
     

      
              

    </Card>
  );
}