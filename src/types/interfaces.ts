export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  movies: BaseMovieProps[];
  selectFavourite: (movieId: number) => void;  //add this
  genre_ids?: number[];
}


export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}
export type FilterOption = "title" | "genre" ;

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  selectFavourite: (movieId: number) => void;  //add this
}


export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export interface Review{
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
}
export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}
export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface DiscoverActors {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}

export interface Actor {
  id: number;
  name: string;
  popularity: number;
  profile_path: string | null;
  known_for: {
    id: number;
    media_type: "movie" | "tv";
    title: string;
    name: string;
    poster_path: string | null;
  }[];
  known_for_department: string;
}
export interface ActorDetailsProps {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
}