import Image from "next/image";
import useGetPokemon from "hooks/useGetPokemon";
import Loading from "../Loading";

const defaultPokemonID = 1;
const PokeForm = () => {
  const { data, isLoading, isError } = useGetPokemon(defaultPokemonID);

  if (isLoading) return <Loading />;
  if (isError) return <h1>Ha ocurrido un error</h1>;

  return (
    <div className="text-center">
      <Image
        src={data.sprites.other["official-artwork"].front_default}
        alt={data.name}
        width={200}
        height={200}
      />
      <h2 className="text-2xl text-bold">{data.name}</h2>
    </div>
  );
};

export default PokeForm;
