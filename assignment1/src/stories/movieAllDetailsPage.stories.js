import React from "react";
import TemplateMoviePage from "../components/templateMoviePage";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import MovieDetails from "../components/movieDetails";

export default {
  title: "Movie All Details Page/templateMoviePage",
  component: TemplateMoviePage,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,

  ],
};

export const Basic = () => {<TemplateMoviePage movie={SampleMovie} /> ;

}

Basic.storyName = "Default";
