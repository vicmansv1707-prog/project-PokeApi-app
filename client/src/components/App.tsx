import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import About from "./About/About";

import { usePokemonCatalog } from "../hooks/usePokemonCatalog";
import { Route, Routes } from "react-router-dom";

function App(): React.JSX.Element {
  const {
    cards,
    isLoading,
    favoritePokemonIds,
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
  } = usePokemonCatalog();

  const homePage = (
    <Main
      cards={cards}
      isLoading={isLoading}
      favoritePokemonIds={favoritePokemonIds}
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
