import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseCharacters = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const ts = '1'; // Example timestamp
      const publicKey = '29ef43671d735b0073b1fd7115c26d9a';
      const hash = '48552e6249cccfd9dc8adc34f421a61f';

      try {
        setLoading(true);
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=20`);
        setCharacters(prevCharacters => [...prevCharacters, ...response.data.data.results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        alert('Failed to fetch characters. Please check the console for more details.');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [offset]);

  const loadMoreCharacters = () => {
    setOffset(prevOffset => prevOffset + 20); // Increase offset to fetch the next set of characters
  };

  return (
    <div className="character-grid">
      {loading && characters.length === 0 ? (
        <p>Loading...</p>
      ) : (
        characters.length === 0 ? (
          <p>No characters found</p>
        ) : (
          characters.map(character => (
            <div key={character.id} className="character-card" onClick={() => onCharacterClick(character.id)}>
              <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
              <h3>{character.name}</h3>
            </div>
          ))
        )
      )}
      {loading && characters.length > 0 && <p>Loading...</p>}
      {!loading && characters.length > 0 && (
        <button onClick={loadMoreCharacters}>Load More</button>
      )}
    </div>
  );
};

export default BrowseCharacters;

