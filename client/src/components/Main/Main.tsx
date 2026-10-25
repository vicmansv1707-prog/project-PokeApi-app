import Card from "./Card/Card";
import type { MainProps } from "../../types/types";
import pokeball_color from "../../images/pokeball_color.svg";

function Main(props: MainProps): React.JSX.Element {
  const visibleCards = props.showFavoritesOnly
    ? props.cards.filter((card) => props.favoritePokemonIds.includes(card.id))
    : props.cards;

  return (
    <main className="content">
      <h1 className="content__title" aria-hidden="true">
        Pokédex
      </h1>
      <button
        className="content__button-favorites"
        type="button"
        aria-label="Mostrar solo Pokémon favoritos o Todo"
        onClick={props.handleToggleFavorites}
      >
        {!props.showFavoritesOnly ? "Favoritos" : "Todo"}
        <img
          className="content_favorites-icon"
          src={pokeball_color}
          alt=""
          aria-hidden="true"
        />
      </button>
      <div className="content__search-controls">
        {!props.isFirstPage && !props.showFavoritesOnly && (
          <div className="content__buttons-jump">
            <button
              className="content__button-jump content__button-jump-back"
              type="button"
              aria-label="Retroceder 100 Pokémon"
              onClick={props.handleJumpBackward}
            >
              {"<< 100"}
            </button>
            <button
              className="content__button-jump content__button-jump-previous"
              type="button"
              aria-label="Página anterior, retroceder 20 Pokémon"
              onClick={props.handlePreviousPage}
            >
              {"< 20"}
            </button>
          </div>
        )}
        <input
          className="content__input-search"
          type="search"
          placeholder="Busca aquí tu Pokémon"
          value={props.searchTerm}
          onChange={(event) => props.handleSearchTerm(event.target.value)}
          aria-label="Buscar Pokémon por nombre"
        />
        {!props.isLastPage && !props.showFavoritesOnly && (
          <div className="content__buttons-jump">
            <button
              className="content__button-jump content__button-jump-next"
              type="button"
              aria-label="Página siguiente, avanzar 20 Pokémon"
              onClick={props.handleNextPage}
            >
              {"20 >"}
            </button>
            <button
              className="content__button-jump content__button-jump-for"
              type="button"
              aria-label="Avanzar 100 Pokémon"
              onClick={props.handleJumpForward}
            >
              {"100 >>"}
            </button>
          </div>
        )}
      </div>
      {props.isLoading ? (
        <p role="status">Cargando Pokémons...</p>
      ) : props.error ? (
        <p role="alert">{props.error}</p>
      ) : props.searchTerm.trim() !== "" && props.cards.length === 0 ? (
        <p role="status">No se encontró Pokémon con ese nombre.</p>
      ) : props.showFavoritesOnly && visibleCards.length === 0 ? (
        <p role="status">
          Todavía no tienes Pokémon favoritos. Marca la pokébola de una tarjeta
          para agregarla aquí.
        </p>
      ) : (
        <ul className="card__list">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFav={props.favoritePokemonIds.includes(card.id)}
              handleCardFav={props.handleCardFav}
            />
          ))}
        </ul>
      )}
    </main>
  );
}

export default Main;
