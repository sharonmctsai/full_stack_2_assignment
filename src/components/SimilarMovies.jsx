// src/components/SimilarMovies.js
import React from "react";
import { useQuery } from "react-query";
import Spinner from "./spinner";
import { getSimilarMovies } from "../api/tmdb-api";
import MovieCard from "./movieCard"; // Assuming you have a component to display movie cards
import Grid from "@mui/material/Grid"; // Assuming you're using Material UI for layout

const SimilarMovies = ({ movieId }) => {
  const { data, error, isLoading, isError } = useQuery(["similarMovies", movieId], () =>
    getSimilarMovies(movieId)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const similarMovies = data.results;

  return (
    <Grid container spacing={2}>
      {similarMovies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={3}>
          <MovieCard movie={movie} /> {/* Assuming MovieCard is a component you have */}
        </Grid>
      ))}
    </Grid>
  );
};

export default SimilarMovies;
