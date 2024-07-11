import React, { createContext, useState, ReactNode } from 'react';

interface FantasyMovie {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  runtime: number;
  productionCompanies: string[];
}

interface FantasyMoviesContextProps {
  fantasyMovies: FantasyMovie[];
  addFantasyMovie: (movie: FantasyMovie) => void;
}

const initialContextState: FantasyMoviesContextProps = {
  fantasyMovies: [],
  addFantasyMovie: () => {},
};

export const FantasyMoviesContext = createContext<FantasyMoviesContextProps>(initialContextState);

const FantasyMoviesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovie[]>([]);

  const addFantasyMovie = (movie: FantasyMovie) => {
    setFantasyMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <FantasyMoviesContext.Provider value={{ fantasyMovies, addFantasyMovie }}>
      {children}
    </FantasyMoviesContext.Provider>
  );
};

export default FantasyMoviesProvider;
