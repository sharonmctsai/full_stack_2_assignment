import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import FilterCard from "../components/filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

const styles = {
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseDateBeforeFilter, setReleaseDateBeforeFilter] = useState("");
  const [releaseDateAfterFilter, setReleaseDateAfterFilter] = useState("");

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const genreId = Number(genreFilter);

  const displayedMovies = allFavourites
    .filter((m) => m.title.toLowerCase().includes(titleFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => (releaseDateBeforeFilter ? m.release_date <= releaseDateBeforeFilter : true))
    .filter((m) => (releaseDateAfterFilter ? m.release_date >= releaseDateAfterFilter : true));

  const handleChange = (type: string, value: string) => {
    switch (type) {
      case "title":
        setTitleFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
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
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <RemoveFromFavourites {...movie} />
            <WriteReview {...movie} />
          </>
        )}
      />
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          releaseDateBeforeFilter={releaseDateBeforeFilter}
          releaseDateAfterFilter={releaseDateAfterFilter}
        />
      </Drawer>
    </>
  );
};

export default FavouriteMoviesPage;
