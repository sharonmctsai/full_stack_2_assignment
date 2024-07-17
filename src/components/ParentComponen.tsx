import React, { useState, useEffect } from 'react';
import FilterMoviesCard from './components/filterMoviesCard';
import MovieList from './components/MovieList'; // Assuming you have a MovieList component to display movies
import { getMovies } from './api/tmdb-api'; // Assuming this API call fetches the list of movies
import { Movie } from './types/interfaces'; // Assuming this is the type for movie data

const ParentComponent: React.FC = () => {
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [genreFilter, setGenreFilter] = useState<string>('0'); // Default to "All"
  const [releaseDateFilter, setReleaseDateFilter] = useState<string>('');
  const [popularityFilter, setPopularityFilter] = useState<string>(''); // Add this line
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      setAllMovies(movies);
      setFilteredMovies(movies);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = allMovies;

    if (titleFilter) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (genreFilter !== '0') {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(parseInt(genreFilter))
      );
    }

    if (releaseDateFilter) {
      filtered = filtered.filter((movie) =>
        new Date(movie.release_date) >= new Date(releaseDateFilter)
      );
    }

    if (popularityFilter) {
      filtered = filtered.filter((movie) =>
        movie.popularity >= parseFloat(popularityFilter)
      );
    }

    setFilteredMovies(filtered);
  }, [titleFilter, genreFilter, releaseDateFilter, popularityFilter, allMovies]);

  const handleUserInput = (filter: string, value: string) => {
    switch (filter) {
      case 'title':
        setTitleFilter(value);
        break;
      case 'genre':
        setGenreFilter(value);
        break;
      case 'releaseDate':
        setReleaseDateFilter(value);
        break;
      case 'popularity':
        setPopularityFilter(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <FilterMoviesCard
        titleFilter={titleFilter}
        genreFilter={genreFilter}
        releaseDateFilter={releaseDateFilter}
        popularityFilter={popularityFilter} // Pass the popularity filter
        onUserInput={handleUserInput}
      />
      <MovieList movies={filteredMovies} action={() => {}} />
    </>
  );
};

export default ParentComponent;
