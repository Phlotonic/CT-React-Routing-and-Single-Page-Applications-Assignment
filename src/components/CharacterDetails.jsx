import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const ts = '1'; // Example timestamp
      const publicKey = '29ef43671d735b0073b1fd7115c26d9a';
      const hash = '48552e6249cccfd9dc8adc34f421a61f';

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error('Error fetching character details:', error);
        alert('Failed to fetch character details. Please check the console for more details.');
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!character) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <p>{character.description}</p>
    </div>
  );
};

export default CharacterDetails;

