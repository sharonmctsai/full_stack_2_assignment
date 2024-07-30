import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({ movies, title, action, handleNext, handleBack }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [popularityFilter, setPopularityFilter] = useState("0");
  const [releaseDateBeforeFilter, setReleaseDateBeforeFilter] = useState("");
  const [releaseDateAfterFilter, setReleaseDateAfterFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1)
    .filter((m) => genreId > 0 ? m.genre_ids.includes(genreId) : true)
    .filter((m) => popularityFilter ? m.popularity >= Number(popularityFilter) : true)
    .filter((m) => releaseDateBeforeFilter ? m.release_date <= releaseDateBeforeFilter : true)
    .filter((m) => releaseDateAfterFilter ? m.release_date >= releaseDateAfterFilter : true);

  const handleChange = (type, value) => {
    switch (type) {
      case "title":
        setTitleFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "popularity":
        setPopularityFilter(value);
        break;
      case "release_date_before":
        setReleaseDateBeforeFilter(value);
        break;
      case "release_date_after":
        setReleaseDateAfterFilter(value);
        break;
      default:
        break;
    }
  };

  return (
   <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} handleNext={handleNext} handleBack={handleBack} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            action={action}
            movies={displayedMovies}
          />
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          popularityFilter={popularityFilter}
          releaseDateBeforeFilter={releaseDateBeforeFilter}
          releaseDateAfterFilter={releaseDateAfterFilter}
        />
      </Drawer>
    </>  
  );
}
export default MovieListPageTemplate;