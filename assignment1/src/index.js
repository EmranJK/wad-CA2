import AddMovieReviewPage from './pages/addMovieReviewPage'
import SiteHeader from './components/siteHeader'
import MoviesContextProvider from "./contexts/moviesContext";
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import AuthHeader from "./auth/authHeader";
import AuthProvider from "./auth/authContext";
import LoginPage from "./auth/loginPage";
import PrivateRoute from "./auth/privateRoute";
//
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import ActorPage from "./pages/actorDetailsPage";
//
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import WatchListPage from "./pages/watchListPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
        <AuthHeader />
        <SiteHeader />
        <MoviesContextProvider>
            {" "}
            <Switch>
        <Route exact path="/movie/now_playing" component={NowPlayingMoviesPage} />
        <Route exact path="/movie/popular" component={PopularMoviesPage} />
        <Route exact path="/movie/top_rated" component={TopRatedMoviesPage} /> 
        
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <PrivateRoute exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <PrivateRoute exact path="/movies/watchList" component={WatchListPage} />
        <Route path="/movies/:id" component={MoviePage} />

        <Route path="/actor/:id" component={ActorPage} />
        <Route path="/login" component={LoginPage} />

        <Route exact path="/" component={HomePage} />
        
        
        <Redirect from="*" to="/" />
        </Switch>
        </MoviesContextProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));