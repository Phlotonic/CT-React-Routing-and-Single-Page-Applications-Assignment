import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComics = async () => {
      const ts = '1'; // Example timestamp
      const publicKey = '29ef43671d735b0073b1fd7115c26d9a';
      const hash = '48552e6249cccfd9dc8adc34f421a61f';

      try {
        setLoading(true);
        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=20`);
        setComics(prevComics => [...prevComics, ...response.data.data.results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comics:', error);
        alert('Failed to fetch comics. Please check the console for more details.');
        setLoading(false);
      }
    };

    fetchComics();
  }, [offset]);

  const loadMoreComics = () => {
    setOffset(prevOffset => prevOffset + 20); // Increase offset to fetch the next set of comics
  };

  return (
    <div className="comics-grid">
      {loading && comics.length === 0 ? (
        <p>Loading...</p>
      ) : (
        comics.length === 0 ? (
          <p>No comics found</p>
        ) : (
          comics.map(comic => (
            <div key={comic.id} className="comic-card">
              <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
              <h3>{comic.title}</h3>
            </div>
          ))
        )
      )}
      {loading && comics.length > 0 && <p>Loading...</p>}
      {!loading && comics.length > 0 && (
        <button onClick={loadMoreComics}>Load More</button>
      )}
    </div>
  );
};

export default Comics;
