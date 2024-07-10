import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    watchlist: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addToWatchlist: (movie: BaseMovieProps) => void;
    removeFromWatchlist: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    watchlist: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addToWatchlist: () => {},
    removeFromWatchlist: () => {},
    addReview: (movie, review) => { movie.id, review },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] );

    const addReview = (movie:BaseMovieProps, review: Review) => {
        setMyReviews( {...myReviews, [movie.id]: review } );
    };

    const [favourites, setFavourites] = useState<number[]>([]);
    const [watchlist, setWatchlist] = useState<number[]>([]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addToWatchlist = useCallback((movie: BaseMovieProps) => {
        setWatchlist((prevWatchlist) => {
            if (!prevWatchlist.includes(movie.id)) {
                return [...prevWatchlist, movie.id];
            }
            return prevWatchlist;
        });
    }, []);

    const removeFromWatchlist = useCallback((movie: BaseMovieProps) => {
        setWatchlist((prevWatchlist) => prevWatchlist.filter((mId) => mId !== movie.id));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                watchlist,
                addToFavourites,
                removeFromFavourites,
                addToWatchlist,
                removeFromWatchlist,
                addReview,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
