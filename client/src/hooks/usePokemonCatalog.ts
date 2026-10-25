import { useEffect, useState } from "react";
import { api } from "../utils/api";
import type { CardData, PokemonResource } from "../types/types";

const FAVORITES_KEY = "pokeapi-favorite-ids";
const PAGE_SIZE = 20;

function loadFavoriteIds(): number[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (
      !Array.isArray(parsed) ||
      !parsed.every((id) => typeof id === "number")
    ) {
      return [];
    }

    return parsed as number[];
  } catch {
    return [];
  }
}

export function usePokemonCatalog() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [pokemonIndex, setPokemonIndex] = useState<PokemonResource[] | null>(
    null,
  );
  const [favoritePokemonIds, setFavoritePokemonIds] =
    useState<number[]>(loadFavoriteIds);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const matchingPokemonCount =
    pokemonIndex?.filter((pokemon) =>
      pokemon.name
        .toLocaleLowerCase()
        .includes(debouncedSearchTerm.trim().toLocaleLowerCase()),
    ).length ?? 0;

  const isFirstPage = offset === 0;
  const isLastPage = offset + PAGE_SIZE >= matchingPokemonCount;

  const lastPageOffset =
    Math.max(0, Math.ceil(matchingPokemonCount / PAGE_SIZE) - 1) * PAGE_SIZE;

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCardFav = (selectedCard: CardData): void => {
    setFavoritePokemonIds((currentIds) =>
      currentIds.includes(selectedCard.id)
        ? currentIds.filter((id) => id !== selectedCard.id)
        : [...currentIds, selectedCard.id],
    );
  };

  const handleSearchTerm = (searchTerm: string): void => {
    startLoading();
    setSearchTerm(searchTerm);
    setOffset(0);
  };

  const handleNextPage = () => {
    startLoading();
    setOffset((currentOffset) => currentOffset + PAGE_SIZE);
  };

  const handlePreviousPage = () => {
    startLoading();
    setOffset((currentOffset) => Math.max(0, currentOffset - PAGE_SIZE));
  };

  const handleJumpForward = () => {
    startLoading();
    setOffset((currentOffset) =>
      Math.min(currentOffset + PAGE_SIZE * 5, lastPageOffset),
    );
  };

  const handleJumpBackward = () => {
    startLoading();
    setOffset((currentOffset) => Math.max(0, currentOffset - PAGE_SIZE * 5));
  };

  const handleToggleFavorites = (): void => {
    startLoading();
    setShowFavoritesOnly((currentValue) => !currentValue);
    setOffset(0);
  };

  useEffect(() => {
    let isActive = true;

    api
      .getPokemonIndex()
      .then((loadedIndex) => {
        if (isActive) {
          setPokemonIndex(loadedIndex);
        }
      })
      .catch((error: unknown) => {
        if (!isActive) return;

        setError(
          error instanceof Error
            ? error.message
            : "No se pudo cargar el catálogo",
        );
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (
      pokemonIndex === null ||
      !showFavoritesOnly ||
      searchTerm !== debouncedSearchTerm
    )
      return;

    let isActive = true;

    const favoritePokemonResources = pokemonIndex.filter((resource) => {
      const id = Number(resource.url.split("/").filter(Boolean).pop());
      const matchesSearch = resource.name
        .toLocaleLowerCase()
        .includes(debouncedSearchTerm.trim().toLocaleLowerCase());
      return favoritePokemonIds.includes(id) && matchesSearch;
    });

    api
      .getCards(favoritePokemonResources)
      .then((loadedCards) => {
        if (isActive) setCards(loadedCards);
      })
      .catch((err: unknown) => {
        if (!isActive) return;

        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cargar la información",
        );
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });
    return () => {
      isActive = false;
    };
  }, [
    pokemonIndex,
    favoritePokemonIds,
    debouncedSearchTerm,
    showFavoritesOnly,
    searchTerm,
  ]);

  useEffect(() => {
    if (
      pokemonIndex === null ||
      showFavoritesOnly ||
      searchTerm !== debouncedSearchTerm
    )
      return;

    let isActive = true;

    const normalizedSearchTerm = debouncedSearchTerm.trim().toLocaleLowerCase();

    const filteredPokemon = pokemonIndex.filter((pokemon) =>
      pokemon.name.toLocaleLowerCase().includes(normalizedSearchTerm),
    );

    const pagePokemon = filteredPokemon.slice(offset, offset + PAGE_SIZE);

    api
      .getCards(pagePokemon)
      .then((loadedCards) => {
        if (isActive) {
          setCards(loadedCards);
        }
      })
      .catch((err: unknown) => {
        if (!isActive) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cargar la información",
        );
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [
    offset,
    debouncedSearchTerm,
    pokemonIndex,
    showFavoritesOnly,
    searchTerm,
  ]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritePokemonIds));
  }, [favoritePokemonIds]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return {
    cards,
    favoritePokemonIds,
    isLoading,
    error,
    searchTerm,
    isFirstPage,
    isLastPage,
    showFavoritesOnly,
    handleCardFav,
    handleSearchTerm,
    handleNextPage,
    handlePreviousPage,
    handleJumpForward,
    handleJumpBackward,
    handleToggleFavorites,
  };
}
