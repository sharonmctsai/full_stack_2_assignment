import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailsProps, MovieImage } from "../types/interfaces";
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const styles = {
  imageListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: "80%",
    height: "auto",
  },
};

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps>();
  const [images, setImages] = useState<MovieImage[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MovieDetailsProps[]>([]);

  // Fetch movie details
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((movie) => {
        setMovie(movie);
      });
  }, [id]);

  // Fetch movie images
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters)
      .then((images) => {
        setImages(images);
      });
  }, [id]);

  // Fetch similar movies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSimilarMovies(json.results);
      });
  }, [id]);

  return (
    <>
      {movie ? (
        <>
          <MovieHeader {...movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div>
                <ImageList sx={styles.imageListRoot} cols={1}>
                  {images.map((image) => (
                    <ImageListItem
                      key={image.file_path}
                      sx={styles.gridListTile}
                      cols={1}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={"Movie poster"}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails {...movie} />

              {/* Display similar movies */}
              <h2>Similar Movies to : {movie.title} </h2>
              <Grid container spacing={2}>
                {similarMovies.map((similarMovie) => (
                  <Grid item xs={4} key={similarMovie.id}>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`}
                        alt={similarMovie.title}
                        style={{ width: "60%" }}
                      />
                      <p>{similarMovie.title}</p>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
