const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
import { ActorDetailsProps, DiscoverMovies } from "../types/interfaces";
import { DiscoverActors } from "../types/interfaces"; // Adjust the interface based on your needs
export const getPopularActors = async (): Promise<DiscoverActors> => {
  const response = await fetch(
    `${import.meta.env.VITE_TMDB_BASE_URL}/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch popular actors');
  }
  return response.json();
};
export const getUpcomingMovies = async (): Promise<DiscoverMovies> => {
  const response = await fetch(
    `${import.meta.env.VITE_TMDB_BASE_URL}/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  return response.json();
};
export const getPopularMovies = async (): Promise<DiscoverMovies> => {
  const response = await fetch(
    `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};


export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };
  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  export const fetchActorDetails = async (actorId: string): Promise<ActorDetailsProps> => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`);
    if (!response.ok) {
      const errorDetail = await response.json();
      console.error('Failed to fetch actor details:', errorDetail);
      throw new Error('Failed to fetch actor details');
    }
    return response.json();
  };