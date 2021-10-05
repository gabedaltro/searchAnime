import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import './App.css';

const api = 'https://kitsu.io/api/edge/'


export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');


  useEffect(() => {
    if(text) {
      setInfo({});
      fetch(
        `${api}anime?filter[text]=${text}&page[limit]=12`
      )
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
          console.log(response);
        });
    }
  }, [text])

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput
        value={text}
        onChange={(search) => setText(search)} 
      />
      {text && !info.data && (
        <div>
          <br />
          <span>Carregando...</span>
        </div>
      )}
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
