import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { MoviesContext } from "../contexts/moviesContext";

const HomePage = (props) => {
  const [page, setPage] = useState(1);
  
  const { data, error, isLoading, isError } = useQuery(
      ["discover", { page: page }],
      getMovies
    );

  const handleNext = () => {
    setPage(old => (old + 1));
  };

  const handleBack = () => {
    setPage(old => Math.max(old - 1, 1));
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon object={movie} targetContext={MoviesContext}/>
      }}
      handleNext={handleNext}
      handleBack={handleBack}
    />
  );
};
export default HomePage;