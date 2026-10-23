import type {
  ApiData,
  CardData,
  PokemonListResponse,
  PokemonDetailsResponse,
  PokemonResource,
} from "../types/types";

export const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

class Api {
  private apiData: ApiData;

  constructor(apiData: ApiData) {
    this.apiData = apiData;
  }

  async handleResult<T>(res: Response): Promise<T> {
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message ?? `Error ${res.status}`);
    }
    return res.json();
  }

  async getPokemonList(
    limit: number,
    offset: number,
  ): Promise<PokemonListResponse> {
    const res = await fetch(
      `${this.apiData.baseUrl}?limit=${limit}&offset=${offset}`,
      {
        headers: this.apiData.headers,
      },
    );

    return this.handleResult<PokemonListResponse>(res);
  }

  async getCards(pokemonResources: PokemonResource[]): Promise<CardData[]> {
    const pokemonDetails = await Promise.all(
      pokemonResources.map(async ({ url }) => {
        const res = await fetch(url, {
          headers: this.apiData.headers,
        });
        return this.handleResult<PokemonDetailsResponse>(res);
      }),
    );

    return pokemonDetails.map((pokemon): CardData => {
      const image =
        pokemon.sprites.other?.["official-artwork"]?.front_default ??
        pokemon.sprites.front_default;

      return {
        id: pokemon.id,
        name: pokemon.name,
        image,
        types: pokemon.types.map((item) => item.type.name),
        isFav: false,
      };
    });
  }

  async getPokemonIndex(): Promise<PokemonResource[]> {
    const firstPage = await this.getPokemonList(1, 0);
    const completeList = await this.getPokemonList(firstPage.count, 0);
    return completeList.results;
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});
