// src/pages/PopularActorsPage.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { getPopularActors } from '../api/tmdb-api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Spinner from '../components/spinner';
import { DiscoverActors, Actor } from '../types/interfaces';

const PopularActorsPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverActors>('popularActors', getPopularActors);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      <Typography variant="h2" component="h1">Popular Actors</Typography>
      <Grid container spacing={2}>
        {data?.results.map((actor: Actor) => (
          <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
              />
              <CardContent>
                <Typography variant="h6" component="h3">{actor.name}</Typography>
                <Button variant="contained" color="primary">
                  <Link to={`/actors/${actor.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    More Info
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PopularActorsPage;
