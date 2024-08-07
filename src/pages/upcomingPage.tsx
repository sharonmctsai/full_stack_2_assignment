import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import FilterMoviesCard from "../components/filterMoviesCard";

const styles = {
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const UpcomingPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [releaseDateBeforeFilter, setReleaseDateBeforeFilter] = useState("");
  const [releaseDateAfterFilter, setReleaseDateAfterFilter] = useState("");

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("upcoming", getUpcomingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);

    switch (type) {
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

  const movies = data ? data.results : [];

  const genreId = Number(filterValues[1].value);
  const displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(filterValues[0].value.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => {
      const releaseDate = new Date(m.release_date);
      return releaseDateBeforeFilter ? releaseDate <= new Date(releaseDateBeforeFilter) : true;
    })
    .filter((m) => {
      const releaseDate = new Date(m.release_date);
      return releaseDateAfterFilter ? releaseDate >= new Date(releaseDateAfterFilter) : true;
    });

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie) => <AddToFavouritesIcon {...movie} />}
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
        <FilterMoviesCard
          onUserInput={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
          releaseDateBeforeFilter={releaseDateBeforeFilter}
          releaseDateAfterFilter={releaseDateAfterFilter}
        />
      </Drawer>
    </>
  );
};

export default UpcomingPage;
