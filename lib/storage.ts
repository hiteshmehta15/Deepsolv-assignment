const FAVORITES_KEY = "pokedex_favorites";

export const favoritesStorage = {
  getFavorites(): number[] {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  },

  saveFavorites(favorites: number[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  },

  toggleFavorite(pokemonId: number): number[] {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(pokemonId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(pokemonId);
    }
    
    this.saveFavorites(favorites);
    return favorites;
  },

  isFavorite(pokemonId: number): boolean {
    return this.getFavorites().includes(pokemonId);
  },
};
