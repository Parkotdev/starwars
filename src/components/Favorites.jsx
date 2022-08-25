import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PersonCard } from './PersonCard';

export default function Favorites() {
  const { peoplesList, favoritesList } = useSelector((state) => state.favorite);

  useEffect(() => {
    localStorage.setItem('peoples', JSON.stringify(peoplesList));
  }, [peoplesList]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
  }, [favoritesList]);

  return (
    <>
      <Grid container spacing={4}>
        {favoritesList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <PersonCard person={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
