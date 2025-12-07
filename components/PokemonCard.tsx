"use client";

import Image from "next/image";
import { Pokemon } from "@/types/pokemon";
import { TYPE_COLORS } from "@/lib/constants";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: () => void;
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
}: PokemonCardProps) {
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in">
      <div className="relative">
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
        >
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
            <svg
              className={`w-6 h-6 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div
          onClick={onClick}
          className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center h-48"
        >
          <Image
            src={imageUrl}
            alt={pokemon.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
      <div onClick={onClick} className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
          <span className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, "0")}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
