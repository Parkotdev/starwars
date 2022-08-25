import {
  Card,
  CardContent,
  CardHeader,
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
        sx={{ p: '8px 8px 0' }}
        action={
          <IconButton aria-label='settings' onClick={handleAddOrRemove}>
            {person.favorite ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
          </IconButton>
        }
      />

      <CardContent sx={{ pt: 0 }}>
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
