import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchActorDetails } from "../api/tmdb-api";
import { ActorDetailsProps } from "../types/interfaces";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: actor, isLoading, error } = useQuery<ActorDetailsProps, Error>(
    ["actorDetails", id],
    () => fetchActorDetails(id!)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '32px' }}>{actor.name}</h2>
      {actor.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
          style={{ width: '200px', borderRadius: '8px', marginBottom: '16px' }}
        />
      )}
      <h4 style={{ fontSize: '24px' }}>Biography: </h4><p>{actor?.biography}</p>
      <h4 style={{ fontSize: '24px' }}>Birthday: </h4><p>{actor?.birthday}</p>
      <h4 style={{ fontSize: '24px' }}>Place of Birth: </h4><p>{actor?.place_of_birth}</p>

    </div>
  );
};

export default ActorDetailsPage;
