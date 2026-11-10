/** Datos que la aplicación necesita para mostrar y gestionar una tarjeta Pokémon. */
export interface CardData {
  id: number;
  name: string;
  image: string | null;
  types: string[];
}

export type CardProps = {
  card: CardData;
  isFav: boolean;
  handleCardFav: (card: CardData) => void;
};

export type MainProps = {
  cards: CardData[];
  isLoading: boolean;
  favoritePokemonIds: number[];
  error: string | null;
  searchTerm: string;
  isFirstPage: boolean;
  isLastPage: boolean;
  showFavoritesOnly: boolean;
  handleCardFav: (card: CardData) => void;
  handleSearchTerm: (searchTerm: string) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleJumpForward: () => void;
  handleJumpBackward: () => void;
  handleToggleFavorites: () => void;
};

export interface ApiData {
  baseUrl: string;
  headers: { [key: string]: string };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResource[];
}

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonResource {
  name: string;
  url: string;
}
