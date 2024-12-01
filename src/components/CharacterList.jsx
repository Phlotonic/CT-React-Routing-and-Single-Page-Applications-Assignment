import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const ts = '1'; // Example timestamp
      const publicKey = '29ef43671d735b0073b1fd7115c26d9a';
      const hash = '48552e6249cccfd9dc8adc34f421a61f';

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        console.log(response.data); // Check the API response
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
        alert('Failed to fetch characters. Please check the console for more details.');
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="character-grid">
      {characters.length === 0 ? (
        <p>No characters found</p>
      ) : (
        characters.map(character => (
          <div key={character.id} className="character-card" onClick={() => onCharacterClick(character.id)}>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default CharacterList;
