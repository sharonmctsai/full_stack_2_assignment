import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchActorDetails, fetchActorMovies } from "../api/tmdb-api";
import { ActorDetailsProps, MovieDetailsProps } from "../types/interfaces";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch actor details
  const { data: actor, isLoading: isActorLoading, error: actorError } = useQuery<ActorDetailsProps, Error>(
    ["actorDetails", id],
    () => fetchActorDetails(id!)
  );

  // Fetch actor's movie credits
  const { data: movies, isLoading: isMoviesLoading, error: moviesError } = useQuery<MovieDetailsProps[], Error>(
    ["actorMovies", id],
    () => fetchActorMovies(id!)
  );

  if (isActorLoading || isMoviesLoading) return <div>Loading...</div>;
  if (actorError || moviesError) return <div>Error: {actorError?.message || moviesError?.message}</div>;

  return (
    <div style={{ padding: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
        {actor?.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt={actor.name}
            style={{ width: '400px', borderRadius: '8px' }}
          />
        )}
        <div>
          <h2 style={{ fontSize: '50px', marginBottom: '20px' }}>{actor?.name}</h2>
          <h4 style={{ fontSize: '24px' }}>Biography:</h4>
          <p>{actor?.biography}</p>
          <h4 style={{ fontSize: '24px' }}>Birthday:</h4>
          <p>{actor?.birthday}</p>
          <h4 style={{ fontSize: '24px' }}>Place of Birth:</h4>
          <p>{actor?.place_of_birth}</p>
        </div>
      </div>

      {/* Display the list of movies horizontally */}
      <h4 style={{ fontSize: '24px', marginTop: '40px' }}>Movies:</h4>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {movies?.map((movie) => (
          <div key={movie.id} style={{ marginRight: '20px' }}>
            <Link to={`/movies/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '250px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                  }}
                />
              ) : null}
              <p style={{ fontSize: '16px', textAlign: 'center' }}>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorDetailsPage;
