import React from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import MovieCredits from "../components/movieCredits";
import PageTemplate from "../components/templateActorPage";
import useMovie from "../hooks/useMovie";
// import ActorDetails from "../components/actorDetails";

// import useMovie from "../hooks/useMovie";   Redundant
import { getActor } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ActorPage = (props) => {
  const { id } = props.match.params

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActor
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>

          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default withRouter(ActorPage);