# Assignment 2 - Web API.

Name: Emran Sabbagh

## VERY IMPORTANT NOTE:

This repository is different from the api labs repository. However, it has all the lab work in one commit and the rest of the commits are for the assignment work.

Some commits don't have very descriptive names so in here I will describe what was done in the commits as much as possible:
- New repo: in this commit I added all the api lab work I had into this new repo. I also added the assignment 1 react app.
- Errors: In this commit I was still unable to add any features yet.
- Progress: In this commit I was able to add 3 routes to the API. I was also able to make the react app fetch movies and upcoming movies from the local API. I also started to integrate the JWT authenticaion strategy with the react app.
- 2 New API routes: (Commit name has a typo, it should have been called '3 New API routes'). In this commit I was able to make the 3 new API routes work (i.e. the API successfully fetched data from those new routes from the TMDB-API) and I was able to make the react app fetch the data for those new routes from the local API.
- Fixed Signup page and genres: In this commit I was able to make the Signup feature work. After that the authentication feature was completely functional (i.e. login and signup worked properly) and also was able to make the assignment 1 react app fetch genres from the local API.
- More private routes: In this commit, I increased the number of private routes.
- Express error handling for new routes: In this commit, I added express error handling for all the new API routes in the API(popular movies, now playing movies, top rated movies) and one old route which is the upcoming movies route.

## Features.

A bullet-point list of the ADDITIONAL features I have implemented in the API **THAT WERE NOT IN THE LABS**:
 
 + 3 new API routes - This feature allows the local API to get Popular movies, Now playing movies and top rated movies from the TMDB API. 
 + Mongo integration and Minimal React integration - This feature allows the react app from assignment 1 to GET the data from the local API instead of the TMDB API. This includes the data related to the new routes such as Now playing movies and the data related to the old routes related to the old routes added in the labs such as upcoming movies, discover movies and genres. It also allows the react app to POST data to the local API. The data that the react app can post are for the authentication feature (Log in and Sign up). The assignment 1 react app integrates the following from the local API: (movies, upcoming movies, genres, popular movies, top rated movies, now playing movies, logging in, signing up).
 + Basic Authentication and protected routes - This feature make the user login to be able to view the assignment 1 react app data. This can be done by loggin in with the seeded usernames and passwords or by creating a new username and password by signing up and then logging in with that new username and password.
 + Express error handling - This feature shows the user what went wrong in case of an error. 

## Installation Requirements

In here I describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json)

The softwares that are in the package.json are already installed, they are:
"devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-eslint": "^10.1.0",
    "babel-preset-env": "^1.7.0",
    "eslint": "^8.2.0",
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "bcrypt-nodejs": "0.0.3",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-async-handler": "^1.2.0",
    "express-session": "^1.17.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.13",
    "node-fetch": "^2.6.6",
    "passport": "^0.5.0",
    "passport-jwt": "^4.0.0",
    "uniqid": "^5.4.0"
  }

  The software not in the package.json file That I had to install is: MongoDB
  I had to install this software during my lab work in lab 3

Getting/installing the software:
I Downloaded Mongodb by selecting the relevant installer for my OS: https://www.mongodb.com/download-center/community

Installation:
In the installation process I followed the instructions and accept all defaults.

## API Configuration
In here I describe creating an ``.env`` and what variables to put in it.

- First I ran this command: npm install dotenv --save
- Then I created the .env file and added it to the movie-api folder
- In the .env file of movie-api I added the following:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
SEED_DB=True
SECRET= The JWT secret
TMDB_KEY= The TMDB key
```
Those variables were added on different stages

In the .env file of assignment 1 react app:

```bat
REACT_APP_TMDB_KEY= The TMDB key
FAST_REFRESH=false
```
The .env file for the react app was created long before, it should be in the assignment 1 folder.

## API Design
An overview of my web API design: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /tmdb/upcoming | Gets a list of upcoming movies | N/A | N/A | N/A
| /tmdb/popular | Gets a list of popular movies | N/A | N/A | N/A           (NEW API ROUTE)
| /tmdb/now_playing | Gets a list of now_playing movies | N/A | N/A | N/A   (NEW API ROUTE)
| /tmdb/top_rated | Gets a list of top_rated movies | N/A | N/A | N/A       (NEW API ROUTE)
| /api/users | Gets a list of user IDs, usernames, hashed passwords, there favourites and __v | Registers a new user and hashed password, Authenticates a user | N/A | N/A
| /api/users/:id | N/A | N/A | Modifies a user | N/A
| /api/genres/ | Gets a list of genres | N/A | N/A | N/A


## Security and Authentication
Details of authentication/ security implemented on the API(e.g. passport/sessions). Also Indicates which routes are protected.

The API uses JWT authentication strategy by creating JSON web tokens.
It includes an authorisation middleware which will allow the users with a valid JWT token to access the movies.
The passport is used to extract the username from the token in the request and verify that it is a valid username.
The user id is then passed on to the next middleware, accessible through the request object.

In the assignment 1 react app, the user will have to log in with the existing usernames and passwords that are seeded into the database (can be found in movies-api/seedData/users.js) or he/she can Sign up for a new username with new password and then log in with that username and password.

The private routes in the assignment 1 react app are:
"/movie/now_playing"
"/movie/popular"
"/movie/top_rated"
"/movies/upcoming"
"/movies/favorites"
"/movies/watchList"
"/"


## Integrating with React App

In here I describe how I integrated my React app with the API. I included a link to the React App repo and an example of an API call from React App. For example:

To integrate the assignment 1 react app with the API, I had to change the API calls in the react app so they would fetch the data from the local API instead of the TMDB-API. I also had to integrate the JWT authentication strategy with the react app to make this work. 

From the local API I was able to make the assignment 1 react app GET the following data:
- movies
- upcoming movies
- genres
- popular movies
- now playing movies
- top rated movies

For POST, I was able to integrate the following into the assignment 1 react app:
- Logging In
- Signing UP

Here is the link to my assignment 1 repository which has the old fetch statements: https://github.com/EmranSY/wad2-moviesApp/tree/master

Here is an example of a fetch statement used by the assignment 1 react app to GET movies from the local API:

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

~~~

The rest of the fetch statements can be found in the assignment1/src/api/tmdb-api.js

## Extra features

There are no non-standard features in used. All the features used have been mentioned in the Features section.  

## Independent learning

No non-standard aspects of React/Express/Node (or other related technologies) have been researched or applied in this assignment.
