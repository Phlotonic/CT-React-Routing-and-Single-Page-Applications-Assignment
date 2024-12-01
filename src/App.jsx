import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import Comics from './components/Comics';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import './AppStyles.css';

function App() {
  const navigate = useNavigate();

  const handleCharacterClick = (id) => {
    navigate(`/character-details/${id}`);
  };

  return (
    <div className="app-container">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-characters" element={<BrowseCharacters onCharacterClick={handleCharacterClick} />} />
        <Route path="/character-details/:id" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

