import React, { useState, useEffect } from 'react';
import FilterMoviesCard from './components/FilterMoviesCard';
import MovieList from './components/MovieList';
import { getMovies } from './api/tmdb-api';
import { Movie } from './types/interfaces';

const ParentComponent: React.FC = () => {
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [genreFilter, setGenreFilter] = useState<string>('0');
  const [releaseDateFilter, setReleaseDateFilter] = useState<string>('');
  const [popularityFilter, setPopularityFilter] = useState<string>('');
  const [runtimeFilter, setRuntimeFilter] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title'); // Add this line
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

    if (runtimeFilter) {
      filtered = filtered.filter((movie) =>
        movie.runtime <= parseInt(runtimeFilter)
      );
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'release_date':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case 'popularity':
          return b.popularity - a.popularity;
        case 'runtime':
          return b.runtime - a.runtime;
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  }, [titleFilter, genreFilter, releaseDateFilter, popularityFilter, runtimeFilter, sortOption, allMovies]);

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
      case 'runtime':
        setRuntimeFilter(value);
        break;
      case 'sort':
        setSortOption(value);
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
        popularityFilter={popularityFilter}
        runtimeFilter={runtimeFilter}
        sortOption={sortOption} // Pass the sort option
        onUserInput={handleUserInput}
      />
      <MovieList movies={filteredMovies} action={() => {}} />
    </>
  );
};

export default ParentComponent;
