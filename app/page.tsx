import { pokeApi } from "@/lib/api";
import { Pokemon } from "@/types/pokemon";
import Header from "@/components/Header";
import PokemonClient from "@/components/PokemonClient";

async function getInitialPokemon(): Promise<Pokemon[]> {
  try {
    const listResponse = await pokeApi.getPokemonList(150, 0);
    
    const pokemonDetails = await Promise.all(
      listResponse.results.map(async (item: { name: string }) => {
        return await pokeApi.getPokemonDetails(item.name);
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Failed to fetch initial Pokemon:", error);
    return [];
  }
}

export default async function Home() {
  const initialPokemon = await getInitialPokemon();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">Pokedex Lite</h1>
          <p className="text-gray-600">Discover and explore Pokemon</p>
        </header>

        <PokemonClient initialPokemon={initialPokemon} />
      </div>
    </main>
  );
}
