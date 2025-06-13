import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';
import PokemonCard from './components/custom/PokemonCard';
import Spinner from './components/ui/spinner';
import { Button } from './components/ui/button';

function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getImage = (query) => {
    axios.get(`${query}`).then((res) => {
      return res.data.sprites.other["official-artwork"].front_default;
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
      .then((res) => {
        const totalCount = res.data.count;
        setTotalDataCount(totalCount);
        const pokemonResults = res.data.results;
        pokemonResults.map((val) =>
          axios
            .get(val.url)
            .then((res) => {
              const updatedData = {
                ...val,
                imgUrl:
                  res.data.sprites.other["official-artwork"].front_default,
                types: res.data.types,
                id: String(res.data.id).padStart(
                  String(totalCount).length,
                  "0"
                ),
              };
              setData((prevData) => [...prevData, updatedData]);
              // console.log({ updatedData });
            })
            .catch((err) => {
              throw new Error("Error Fetching data");
            })
        );
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => setLoading(false));
  }, [offset])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap',  }}>
        {data &&
          data.map((pokemon, index) => (
            <PokemonCard pokemon={pokemon} key={index} />
          ))}
      </div>
      <Button onClick={() => {
        setOffset((val) => (val < totalDataCount ? val + 5 : val))
      }}>Load More</Button>
      <div style={{alignContent: 'center', marginTop: 10}}>
        Displaying {loading ? <Spinner loading /> : offset+5} of {totalDataCount} Pokemons
      </div>
    </div>
  )
}

export default App
