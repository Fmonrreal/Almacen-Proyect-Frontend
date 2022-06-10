import { useQuery } from "react-query";

const getPokemon = async (pokemonID) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  return resp.json();
};

const useGetPokemon = (pokemonID) => {
  const { data, isLoading, isError } = useQuery(["pokemon", pokemonID], () =>
    getPokemon(pokemonID)
  );

  return { data, isLoading, isError };
};

export default useGetPokemon;
