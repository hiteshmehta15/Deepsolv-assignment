const BASE_URL = "https://pokeapi.co/api/v2";

export const pokeApi = {
  async getPokemonList(limit: number = 20, offset: number = 0) {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) throw new Error("Failed to fetch Pokemon list");
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  },

  async getPokemonDetails(nameOrId: string | number) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
      if (!response.ok) throw new Error("Failed to fetch Pokemon details");
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  },

  async getAllTypes() {
    try {
      const response = await fetch(`${BASE_URL}/type`);
      if (!response.ok) throw new Error("Failed to fetch types");
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  },

  async getPokemonByType(typeName: string) {
    try {
      const response = await fetch(`${BASE_URL}/type/${typeName}`);
      if (!response.ok) throw new Error("Failed to fetch Pokemon by type");
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  },
};
