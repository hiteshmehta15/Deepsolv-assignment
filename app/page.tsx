import { pokeApi } from "@/lib/api";
import { Pokemon } from "@/types/pokemon";
import Header from "@/components/Header";
import PokemonClient from "@/components/PokemonClient";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">Pokedex Lite</h1>
          <p className="text-gray-600">Discover and explore Pokemon</p>
        </header>

        <PokemonClient initialPokemon={[]} />
      </div>
    </main>
  );
}
