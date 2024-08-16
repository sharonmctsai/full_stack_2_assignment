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
import ActorDetailsPage from "./pages/actorDetailsPage";
import AuthProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import ProtectedRoute from './components/protectedRoute';

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
    <AuthProvider>
      <SiteHeader />  
      <MoviesContextProvider>  
      <Routes>
      <Route path="/reviews/:id" element={<MovieReviewPage/>} />
  {/* Movie Routes */}
  <Route path="/movies/favourites" element={
                      <ProtectedRoute>
                        <FavouriteMoviesPage />
                      </ProtectedRoute>
                    } />
                         <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/movies/watchlist" element={<WatchListPage/>} />
        <Route path="/movies/upcoming" element={<UpcomingPage/>} />
        <Route path="/movies/popular" element={<PopularMoviesPage/>} />
        <Route path="/actors/popular" element={<PopularActorsPage />} /> 
        <Route path="/actors/:id" element={<ActorDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />

      </Routes>
      </MoviesContextProvider>  
      </AuthProvider>
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