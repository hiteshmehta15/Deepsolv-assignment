import { pokeApi } from "@/lib/api";
import { Pokemon } from "@/types/pokemon";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const pokemon: Pokemon = await pokeApi.getPokemonDetails(params.id);
    
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokedex Lite`,
      description: `View detailed information about ${pokemon.name} including stats, abilities, and types.`,
      openGraph: {
        title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokedex Lite`,
        description: `View detailed information about ${pokemon.name}`,
        images: [pokemon.sprites.other["official-artwork"].front_default],
      },
    };
  } catch (error) {
    return {
      title: "Pokemon Not Found - Pokedex Lite",
      description: "The requested Pokemon could not be found.",
    };
  }
}

export default async function PokemonPage({ params }: { params: { id: string } }) {
  try {
    const pokemon: Pokemon = await pokeApi.getPokemonDetails(params.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
          <p className="text-gray-600 mb-8">Pokemon Details Page (Server-Side Rendered)</p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="w-64 h-64 mx-auto"
              />
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Stats</h2>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{stat.stat.name.replace("-", " ")}</span>
                      <span className="font-semibold">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Pokemon Not Found</h1>
          <p className="text-gray-600">The requested Pokemon could not be found.</p>
        </div>
      </div>
    );
  }
}
