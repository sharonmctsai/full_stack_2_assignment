import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const genres = [
  { id: 0, name: "All" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const FilterMoviesCard = ({
  onUserInput,
  titleFilter,
  genreFilter,
  releaseDateBeforeFilter,
  releaseDateAfterFilter,
}) => {
  const handleTextChange = (e) => {
    onUserInput(e.target.name, e.target.value);
  };

  const handleGenreChange = (e) => {
    onUserInput("genre", e.target.value);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 500, margin: '0 auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="filled-search"
            label="Title"
            type="search"
            variant="filled"
            name="title"
            value={titleFilter}
            onChange={handleTextChange}
            margin="normal"
            InputProps={{
              style: { fontSize: 20 },
            }}
            InputLabelProps={{
              style: { fontSize: 20 },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="filled-select-genre"
            select
            label="Genre"
            value={genreFilter}
            onChange={handleGenreChange}
            variant="filled"
            margin="normal"
            InputProps={{
              style: { fontSize: 20 },
            }}
            InputLabelProps={{
              style: { fontSize: 20 },
            }}
          >
            {genres.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="filled-date-before"
            label="Release Date Before"
            type="date"
            variant="filled"
            name="release_date_before"
            value={releaseDateBeforeFilter}
            onChange={handleTextChange}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: 20 },
            }}
            InputProps={{
              style: { fontSize: 20 },
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="filled-date-after"
            label="Release Date After"
            type="date"
            variant="filled"
            name="release_date_after"
            value={releaseDateAfterFilter}
            onChange={handleTextChange}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: 20 },
            }}
            InputProps={{
              style: { fontSize: 20 },
            }}
            margin="normal"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterMoviesCard;
