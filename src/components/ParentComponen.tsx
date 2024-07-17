// Assuming the parent component looks something like this

import React, { useState } from 'react';
import FilterMoviesCard from './components/filterMoviesCard';

const ParentComponent = () => {
  const [titleFilter, setTitleFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [releaseDateFilter, setReleaseDateFilter] = useState('');

  const handleUserInput = (type: FilterOption, value: string) => {
    switch (type) {
      case 'title':
        setTitleFilter(value);
        break;
      case 'genre':
        setGenreFilter(value);
        break;
      case 'releaseDate':
        setReleaseDateFilter(value);
        break;
      default:
        break;
    }
  };

  return (
    <FilterMoviesCard
      titleFilter={titleFilter}
      genreFilter={genreFilter}
      releaseDateFilter={releaseDateFilter}
      onUserInput={handleUserInput}
    />
  );
};

export default ParentComponent;
