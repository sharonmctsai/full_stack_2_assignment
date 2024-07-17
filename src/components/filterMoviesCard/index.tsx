import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  releaseDateFilter: string;
  popularityFilter: string;
  runtimeFilter: string;
  sortOption: string; // Add this line
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, releaseDateFilter, popularityFilter, runtimeFilter, sortOption, onUserInput }) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: FilterOption, value: string) => {
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleReleaseDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "releaseDate", e.target.value);
  };

  const handlePopularityChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "popularity", e.target.value);
  };

  const handleRuntimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "runtime", e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    handleChange(e, "sort", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={styles.formControl}
            id="release-date"
            label="Release Date"
            type="date"
            value={releaseDateFilter}
            variant="filled"
            onChange={handleReleaseDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={styles.formControl}
            id="popularity"
            label="Popularity"
            type="number"
            value={popularityFilter}
            variant="filled"
            onChange={handlePopularityChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={styles.formControl}
            id="runtime"
            label="Runtime"
            type="number"
            value={runtimeFilter}
            variant="filled"
            onChange={handleRuntimeChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="release_date">Release Date</MenuItem>
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="runtime">Runtime</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
