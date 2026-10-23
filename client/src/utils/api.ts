import type {
  ApiData,
  CardData,
  PokemonListResponse,
  PokemonDetailsResponse,
  PokemonResource,
} from "../types/types";

export const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
const cardCache = new Map<number, CardData>();

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
    return Promise.all(
      pokemonResources.map(async ({ url }) => {
        const id = Number(url.split("/").filter(Boolean).pop());
        const cachedCard = cardCache.get(id);

        if (cachedCard) return cachedCard;

        const res = await fetch(url, {
          headers: this.apiData.headers,
        });
        const pokemon = await this.handleResult<PokemonDetailsResponse>(res);

        const image =
          pokemon.sprites.other?.["official-artwork"]?.front_default ??
          pokemon.sprites.front_default;

        const card: CardData = {
          id: pokemon.id,
          name: pokemon.name,
          image,
          types: pokemon.types.map((item) => item.type.name),
          isFav: false,
        };

        cardCache.set(card.id, card);
        return card;
      }),
    );
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
