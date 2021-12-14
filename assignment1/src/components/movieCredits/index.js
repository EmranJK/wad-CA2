import React, { useState, useEffect} from "react";
import { useQuery } from "react-query";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews"
import { getMovieCredit } from '../../api/tmdb-api'
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

  export default ({ movie }) =>{
    const classes = useStyles();
    const [credits, setCredits] = useState([]);
  
    useEffect(() => {
      getMovieCredit(movie.id).then((credits) => {
        setCredits(credits);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  return (
      <div>
        <h3>Credits (Cast and Crew)</h3>
        <div className= "row movies bg-info">
          {credits.map(r => {


            return(

                <div className="col-sm-3">
                  <div className="card  bg-white">
                  <Link to={`/actor/${r.id}`}>
                    <img
                        className="card-img-tag center "
                        width="300" 
                        height="450"
                        
                        alt={r.id}
                        src={
                          r.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${r.profile_path}`
                              : "./film-poster-placeholder.png"
                        }
                    />
                    </Link>
                    {r.name}
                  </div></div>)})}</div></div>
  );
};

// export default  MovieCredits ;