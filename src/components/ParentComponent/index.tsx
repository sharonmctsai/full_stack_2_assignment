import React, { useState, useEffect } from 'react';
import FilterMoviesCard from './components/FilterMoviesCard';
import MovieList from './components/MovieList';
import { getMovies } from './api/tmdb-api';
import { Movie } from './types/interfaces';

const ParentComponent: React.FC = () => {
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [genreFilter, setGenreFilter] = useState<string>('0');
  const [releaseDateStart, setReleaseDateStart] = useState<string>('');
  const [releaseDateEnd, setReleaseDateEnd] = useState<string>('');
  const [popularityMin, setPopularityMin] = useState<string>('');
  const [popularityMax, setPopularityMax] = useState<string>('');
  const [runtimeMin, setRuntimeMin] = useState<string>('');
  const [runtimeMax, setRuntimeMax] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title');
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

    if (releaseDateStart) {
      filtered = filtered.filter((movie) =>
        new Date(movie.release_date) >= new Date(releaseDateStart)
      );
    }

    if (releaseDateEnd) {
      filtered = filtered.filter((movie) =>
        new Date(movie.release_date) <= new Date(releaseDateEnd)
      );
    }

    if (popularityMin) {
      filtered = filtered.filter((movie) =>
        movie.popularity >= parseFloat(popularityMin)
      );
    }

    if (popularityMax) {
      filtered = filtered.filter((movie) =>
        movie.popularity <= parseFloat(popularityMax)
      );
    }

    if (runtimeMin) {
      filtered = filtered.filter((movie) =>
        movie.runtime >= parseInt(runtimeMin)
      );
    }

    if (runtimeMax) {
      filtered = filtered.filter((movie) =>
        movie.runtime <= parseInt(runtimeMax)
      );
    }

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
  }, [titleFilter, genreFilter, releaseDateStart, releaseDateEnd, popularityMin, popularityMax, runtimeMin, runtimeMax, sortOption, allMovies]);

  const handleUserInput = (filter: string, value: string) => {
    switch (filter) {
      case 'title':
        setTitleFilter(value);
        break;
      case 'genre':
        setGenreFilter(value);
        break;
      case 'releaseDateStart':
        setReleaseDateStart(value);
        break;
      case 'releaseDateEnd':
        setReleaseDateEnd(value);
        break;
      case 'popularityMin':
        setPopularityMin(value);
        break;
      case 'popularityMax':
        setPopularityMax(value);
        break;
      case 'runtimeMin':
        setRuntimeMin(value);
        break;
      case 'runtimeMax':
        setRuntimeMax(value);
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
        releaseDateStart={releaseDateStart}
        releaseDateEnd={releaseDateEnd}
        popularityMin={popularityMin}
        popularityMax={popularityMax}
        runtimeMin={runtimeMin}
        runtimeMax={runtimeMax}
        sortOption={sortOption}
        onUserInput={handleUserInput}
      />
      <MovieList movies={filteredMovies} action={() => {}} />
    </>
  );
};

export default ParentComponent;
