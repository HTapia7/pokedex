import { useState } from 'react';
import axios from 'axios';

function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!inputValue) return;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
      .then((response) => {
        setPokemonList((prevList) => [
          ...prevList,
          response.data,
        ]);
        setError(null);
      })
      .catch(() => {
        setError("Pokémon not found.");
      });
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for a Pokémon..."
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div>
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="mt-4 border p-4 rounded bg-gray-100">
            <p><strong>Name:</strong> {pokemon.name}</p>
            <p><strong>ID:</strong> {pokemon.id}</p>
            <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchbar;
