import React, { useState, ChangeEvent } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import FilterMoviesCard from "../components/filterMoviesCard";
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

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [popularityFilter, setPopularityFilter] = useState("0");
  const [releaseDateBeforeFilter, setReleaseDateBeforeFilter] = useState("");
  const [releaseDateAfterFilter, setReleaseDateAfterFilter] = useState("");

  const { data, error, isLoading, isError } = useQuery(
    ["discover", { page }],
    getMovies
  );

  const handleNext = () => {
    setPage((old) => old + 1);
  };

  const handleBack = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  const handleChange = (type: string, value: string) => {
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
      case "releaseDateBefore":
        setReleaseDateBeforeFilter(value);
        break;
      case "releaseDateAfter":
        setReleaseDateAfterFilter(value);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  const genreId = Number(genreFilter);
  const displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(titleFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => (popularityFilter ? m.popularity >= Number(popularityFilter) : true))
    .filter((m) => (releaseDateBeforeFilter ? m.release_date <= releaseDateBeforeFilter : true))
    .filter((m) => (releaseDateAfterFilter ? m.release_date >= releaseDateAfterFilter : true));
    

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => <AddToFavouritesIcon {...movie} />}
  
      />
      <Fab
       
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterMoviesCard
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

export default HomePage;