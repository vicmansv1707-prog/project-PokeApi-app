import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import About from "./About/About";

import { api } from "../utils/api";
import type { CardData, PokemonResource } from "../types/types";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

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

function App(): React.JSX.Element {
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

  const cardsWithFavorites = cards.map((card) => ({
    ...card,
    isFav: favoritePokemonIds.includes(card.id),
  }));

  const handleCardFav = (selectedCard: CardData): void => {
    setFavoritePokemonIds((currentIds) =>
      currentIds.includes(selectedCard.id)
        ? currentIds.filter((id) => id !== selectedCard.id)
        : [...currentIds, selectedCard.id],
    );
  };

  const handleSearchTerm = (searchTerm: string): void => {
    setIsLoading(true);
    setError(null);
    setSearchTerm(searchTerm);
    setOffset(0);
  };

  const handleNextPage = () => {
    setIsLoading(true);
    setError(null);
    setOffset((currentOffset) => currentOffset + PAGE_SIZE);
  };

  const handlePreviousPage = () => {
    setIsLoading(true);
    setError(null);
    setOffset((currentOffset) => Math.max(0, currentOffset - PAGE_SIZE));
  };

  const handleJumpForward = () => {
    setIsLoading(true);
    setError(null);
    setOffset((currentOffset) =>
      Math.min(currentOffset + PAGE_SIZE * 5, lastPageOffset),
    );
  };

  const handleJumpBackward = () => {
    setIsLoading(true);
    setError(null);
    setOffset((currentOffset) => Math.max(0, currentOffset - PAGE_SIZE * 5));
  };

  const handleToggleFavorites = (): void => {
    setIsLoading(true);
    setError(null);
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

  const homePage = (
    <Main
      cards={cardsWithFavorites}
      isLoading={isLoading}
      error={error}
      searchTerm={searchTerm}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      showFavoritesOnly={showFavoritesOnly}
      handleCardFav={handleCardFav}
      handleSearchTerm={handleSearchTerm}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handleJumpForward={handleJumpForward}
      handleJumpBackward={handleJumpBackward}
      handleToggleFavorites={handleToggleFavorites}
    />
  );

  return (
    <div className="page__content">
      <Header />
      <Routes>
        <Route path="/" element={homePage} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
