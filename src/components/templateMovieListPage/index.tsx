import React from "react";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import Header from "../headerMovieList";

const styles = {
  root: {
    padding: "20px",
  },
};

function MovieListPageTemplate({ movies, title, action, handleNext, handleBack }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} handleNext={handleNext} handleBack={handleBack} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
