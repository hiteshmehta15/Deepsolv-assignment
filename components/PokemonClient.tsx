"use client";

import { useState, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";
import { pokeApi } from "@/lib/api";
import { favoritesStorage } from "@/lib/storage";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import PokemonGrid from "@/components/PokemonGrid";
import SearchBar from "@/components/SearchBar";
import TypeFilter from "@/components/TypeFilter";
import Pagination from "@/components/Pagination";
import PokemonDetailModal from "@/components/PokemonDetailModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

interface PokemonClientProps {
  initialPokemon: Pokemon[];
}

export default function PokemonClient({ initialPokemon }: PokemonClientProps) {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>(initialPokemon);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(initialPokemon);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = favoritesStorage.getFavorites();
    setFavorites(savedFavorites);
  }, []);

  const filterPokemon = () => {
    let filtered = [...allPokemon];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => selectedTypes.includes(t.type.name))
      );
    }

    setFilteredPokemon(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterPokemon();
  }, [searchQuery, selectedTypes, allPokemon]);

  const updateDisplayedPokemon = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filteredPokemon.slice(startIndex, endIndex);
    setDisplayedPokemon(paginated);
    setTotalPages(Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE));
  };

  useEffect(() => {
    updateDisplayedPokemon();
  }, [filteredPokemon, currentPage]);

  const handleToggleFavorite = (id: number) => {
    const newFavorites = favoritesStorage.toggleFavorite(id);
    setFavorites(newFavorites);
  };

  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearTypes = () => {
    setSelectedTypes([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchMorePokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const listResponse = await pokeApi.getPokemonList(150, allPokemon.length);
      
      const pokemonDetails = await Promise.all(
        listResponse.results.map(async (item: { name: string }) => {
          return await pokeApi.getPokemonDetails(item.name);
        })
      );

      setAllPokemon([...allPokemon, ...pokemonDetails]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more Pokemon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex justify-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <TypeFilter
          selectedTypes={selectedTypes}
          onToggleType={handleToggleType}
          onClearAll={handleClearTypes}
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={fetchMorePokemon} />}
      
      {!loading && !error && (
        <>
          <PokemonGrid
            pokemon={displayedPokemon}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectPokemon={setSelectedPokemon}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <PokemonDetailModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </>
  );
}
