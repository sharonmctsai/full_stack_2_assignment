// PopularActorsPage.tsx

import React, { useEffect, useState } from "react";
import { getPopularActors } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Actor, DiscoverActors } from "../types/interfaces";

const PopularActorsPage: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        setIsLoading(true);
        const data: DiscoverActors = await getPopularActors();
        setActors(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularActors();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Popular Actors</h1>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={actor.name}
              style={{ width: 150, height: "auto", marginRight: 10 }}
            />
            <div>
              <h2>{actor.name}</h2>
              <p>Popularity: {actor.popularity}</p>
              <p>Known For: {actor.known_for.map((item) => item.title || item.name).join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularActorsPage;
