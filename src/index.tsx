import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import WatchListPage from "./pages/watchlistPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingPage from './pages/upcomingPage'; // NEW
import PopularActorsPage from "./pages/popularActorsPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import AddFantasyMoviePage from "./pages/AddFantasyMoviePage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />  
      <MoviesContextProvider>  
      <Routes>
      <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/movies/watchlist" element={<WatchListPage/>} />
        <Route path="/movies/upcoming" element={<UpcomingPage/>} />
        <Route path="/movies/popular" element={<PopularMoviesPage/>} />
        <Route path="/actors/popular" element={<PopularActorsPage />} /> 
        <Route path="/movies/fantasy/add" element={<AddFantasyMoviePage />} /> {/* New route */}


      </Routes>
      </MoviesContextProvider>  

    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)