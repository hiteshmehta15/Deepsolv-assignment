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
import Header from "@/components/Header";

export default function Home() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = favoritesStorage.getFavorites();
    setFavorites(savedFavorites);
    fetchInitialPokemon();
  }, []);

  useEffect(() => {
    filterPokemon();
  }, [searchQuery, selectedTypes, allPokemon]);

  useEffect(() => {
    updateDisplayedPokemon();
  }, [filteredPokemon, currentPage]);

  const fetchInitialPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const listResponse = await pokeApi.getPokemonList(150, 0);
      
      const pokemonDetails = await Promise.all(
        listResponse.results.map(async (item: { name: string }) => {
          return await pokeApi.getPokemonDetails(item.name);
        })
      );

      setAllPokemon(pokemonDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Pokemon");
    } finally {
      setLoading(false);
    }
  };

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

  const updateDisplayedPokemon = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filteredPokemon.slice(startIndex, endIndex);
    setDisplayedPokemon(paginated);
    setTotalPages(Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE));
  };

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">Pokedex Lite</h1>
          <p className="text-gray-600">Discover and explore Pokemon</p>
        </header>

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
        {error && <ErrorMessage message={error} onRetry={fetchInitialPokemon} />}
        
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
      </div>
    </main>
  );
}
