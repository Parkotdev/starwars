import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import '../index.scss';

import {
  addFavorite,
  removeFavorite,
} from '../reducers/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';

export const PersonCard = ({ person }) => {
  console.log(person);
  const dispatch = useDispatch();

  const handleAddOrRemove = () => {
    dispatch(
      person.favorite
        ? removeFavorite(person.id)
        : addFavorite({ ...person, favorite: true })
    );
  };

  return (
    <Card className='card'>
      <CardHeader
        sx={{ p: 0, '& .MuiCardHeader-action': { margin: '0 0 -54px' } }}
        action={
          <IconButton
            size='large'
            onClick={handleAddOrRemove}
            sx={{
              p: '3px',
              color: 'rgb(255, 160, 0)',
              '& > svg': { width: '2em', height: '2em' },
            }}
          >
            {person.favorite ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
          </IconButton>
        }
      />

      <CardMedia
        component='img'
        image={`/people/${person.id}.jpg`}
        alt={person.name}
        height={250}
        sx={{ width: 'initial' }}
      />

      <CardContent
        sx={{
          color: '#fff',
          backgroundColor: '#282727',
          borderTop: 'solid #9e4f60',
        }}
      >
        <Typography>
          <strong>Nombre:</strong> {person.name}
        </Typography>

        <Typography>
          <strong>Altura:</strong> {person.height}
        </Typography>

        <Typography>
          <strong>Peso:</strong> {person.mass}
        </Typography>

        <Typography>
          <strong>Fecha nacimiento:</strong> {person.birth_year}
        </Typography>
      </CardContent>
    </Card>
  );
};
