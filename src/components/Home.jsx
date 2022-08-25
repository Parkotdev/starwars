import { Box, CircularProgress, Grid } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PersonCard } from './PersonCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTotalPeoples,
  addPage,
  addPeople,
} from '../reducers/favorite/favoriteSlice';
import axios from 'axios';

export default function Home() {
  //const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const dispatch = useDispatch();
  const { totalPeoples, page, peoplesList, favoritesList } = useSelector(
    (state) => state.favorite
  );

  const observer = useRef();
  const lastPeople = useCallback(
    (node) => {
      if (loading) return;
      if (totalPeoples === peoplesList.length) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(addPage());
          fetchPeoples(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPeoples = async (page) => {
    setLoading(true);
    await axios({
      method: 'GET',
      url: `https://swapi.dev/api/people/?page=${page}`,
    })
      .then((res) => {
        let length = peoplesList.length;
        if (length === res.data.count) {
          setError(true);
        } else {
          dispatch(
            addPeople([
              ...res.data.results.map((item) => {
                length++;
                return {
                  id: length,
                  name: item.name,
                  height: item.height,
                  mass: item.mass,
                  birth_year: item.birth_year,
                  favorite: false,
                };
              }),
            ])
          );
          if (page === 1) dispatch(addTotalPeoples(res.data.count));
          setHasMore(res.data.results.length > 0);
          setLoading(false);
        }
      })
      .catch((e) => {
        setError(true);
      });
  };

  useEffect(() => {
    localStorage.setItem('totalPeoples', JSON.stringify(totalPeoples));
  }, [totalPeoples]);

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page));
  }, [page]);

  useEffect(() => {
    localStorage.setItem('peoples', JSON.stringify(peoplesList));
  }, [peoplesList]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
  }, [favoritesList]);

  useEffect(() => {
    if (peoplesList.length === 0) fetchPeoples(1);
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        {peoplesList.map((item, index) => {
          return peoplesList.length === index + 1 ? (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              ref={lastPeople}
            >
              <PersonCard person={item} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <PersonCard person={item} />
            </Grid>
          );
        })}
      </Grid>

      {loading && !error && (
        <Box sx={{ m: 3, display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
