import {
    getUpcomingMovies
  } from '../tmdb-api';
  import {
    getPopularMovies
  } from '../tmdb-api';
  import {
    getNowPlayingMovies
  } from '../tmdb-api';
  import {
    getTopRatedMovies
  } from '../tmdb-api';
import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/tmdb/upcoming', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    if(upcomingMovies)
    res.status(200).json(upcomingMovies);
    else{
      res.status(404).json({
        message: 'The resource you requested could not be found.',
        status_code: 404
    });}
  }));

  router.get('/tmdb/popular', asyncHandler( async(req, res) => {
    const popularMovies = await getPopularMovies();
    if(popularMovies)
    res.status(200).json(popularMovies);
    else{
      res.status(404).json({
        message: 'The resource you requested could not be found.',
        status_code: 404
    });}
  }));

  router.get('/tmdb/now_playing', asyncHandler( async(req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    if(nowPlayingMovies)
    res.status(200).json(nowPlayingMovies);
    else{
      res.status(404).json({
        message: 'The resource you requested could not be found.',
        status_code: 404
    });}
  }));

  router.get('/tmdb/top_rated', asyncHandler( async(req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    if(topRatedMovies)
    res.status(200).json(topRatedMovies);
    else{
      res.status(404).json({
        message: 'The resource you requested could not be found.',
        status_code: 404
    });}
  }));



export default router;