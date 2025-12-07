"use client";

import { Pokemon } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemon: Pokemon[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectPokemon: (pokemon: Pokemon) => void;
}

export default function PokemonGrid({
  pokemon,
  favorites,
  onToggleFavorite,
  onSelectPokemon,
}: PokemonGridProps) {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={() => onSelectPokemon(p)}
        />
      ))}
    </div>
  );
}
