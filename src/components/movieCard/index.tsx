import React, { MouseEvent, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseMovieProps } from "../../types/interfaces"; 
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: {
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#000", // Set background color to black
    color: "white", // Ensure text is visible on black background
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 10px 20px rgba(255, 255, 255, 0.7)",
      outline: "2px solid rgba(255, 255, 255)", // Add white outline on hover
    },
  },
  media: {
    height: "1000%",
    paddingTop: "150%", // 2:3 aspect ratio
  },
  overlay: {
    position: "absolute",
    top: 10, // Change to top
    left: 0,
    right: 0,
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0)",
    color: "white",
    textAlign: "center",
    opacity: 1, // Set the overlay to be fully visible
  },
};

interface MovieCardProps  {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
  const { favourites, addToFavourites, addToWatchlist } = useContext(MoviesContext);
  const navigate = useNavigate();

  const isFavourite = favourites.find((id) => id === movie.id) ? true : false;

  const handleAddToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToFavourites(movie);
  };
  const handleAddToWatchlist = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    addToWatchlist(movie);
    navigate("/movies/watchlist");
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
       
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      
      <CardContent sx={styles.overlay}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        {action(movie)}
        <PlaylistAddIcon onClick={handleAddToWatchlist} />
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
