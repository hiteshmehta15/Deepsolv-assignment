"use client";

import Image from "next/image";
import { Pokemon } from "@/types/pokemon";
import { TYPE_COLORS } from "@/lib/constants";

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export default function PokemonDetailModal({
  pokemon,
  onClose,
}: PokemonDetailModalProps) {
  if (!pokemon) return null;

  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                width={250}
                height={250}
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <div className="mb-6">
                <span className="text-gray-500 text-sm">
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
                <div className="flex gap-2 mt-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-4 py-2 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Height</p>
                  <p className="text-xl font-semibold">
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Weight</p>
                  <p className="text-xl font-semibold">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className={`px-4 py-2 rounded-lg ${
                        ability.is_hidden
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && " (Hidden)"}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Base Stats</h3>
                <div className="space-y-3">
                  {pokemon.stats.map((stat) => {
                    const statName = stat.stat.name
                      .replace("-", " ")
                      .toUpperCase();
                    const percentage = (stat.base_stat / 255) * 100;
                    
                    return (
                      <div key={stat.stat.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {statName}
                          </span>
                          <span className="text-sm font-semibold">
                            {stat.base_stat}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
