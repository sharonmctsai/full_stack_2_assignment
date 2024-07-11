import React, { useState, useContext, FormEvent } from 'react';
import { FantasyMoviesContext } from '../contexts/fantasyMoviesContext';

const FantasyMovieForm: React.FC = () => {
  const { addFantasyMovie } = useContext(FantasyMoviesContext);
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [productionCompanies, setProductionCompanies] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const genresArray = genres.split(',').map((genre) => genre.trim());
    const productionCompaniesArray = productionCompanies.split(',').map((company) => company.trim());
    addFantasyMovie({
      title,
      overview,
      genres: genresArray,
      releaseDate,
      runtime,
      productionCompanies: productionCompaniesArray,
    });
    // Reset form
    setTitle('');
    setOverview('');
    setGenres('');
    setReleaseDate('');
    setRuntime(0);
    setProductionCompanies('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Overview:</label>
        <textarea value={overview} onChange={(e) => setOverview(e.target.value)} required />
      </div>
      <div>
        <label>Genres (comma separated):</label>
        <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required />
      </div>
      <div>
        <label>Release Date:</label>
        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
      </div>
      <div>
        <label>Runtime (minutes):</label>
        <input type="number" value={runtime} onChange={(e) => setRuntime(parseInt(e.target.value))} required />
      </div>
      <div>
        <label>Production Companies (comma separated):</label>
        <input type="text" value={productionCompanies} onChange={(e) => setProductionCompanies(e.target.value)} required />
      </div>
      <button type="submit">Add Fantasy Movie</button>
    </form>
  );
};

export default FantasyMovieForm;
