import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Favorites from './components/Favorites';
import Home from './components/Home';
import { Box } from '@mui/material';

function App() {
  return (
    <>
      <NavBar />

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
