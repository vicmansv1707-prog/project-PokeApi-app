import pokeball_bw from "../../../images/pokeball_bw.svg";
import pokeball_color from "../../../images/pokeball_color.svg";
import type { CardProps } from "../../../types/types";

function Card(props: CardProps): React.JSX.Element {
  const cardFavButton = props.isFav ? pokeball_color : pokeball_bw;

  return (
    <li className="card">
      <h3 className="card__pokemon-name">{props.card.name}</h3>
      <button
        className="card__fav-button"
        type="button"
        aria-label={`Marcar ${props.card.name} como favorito`}
        aria-pressed={props.isFav}
        onClick={() => props.handleCardFav(props.card)}
      >
        <img className="card__pokeball-fav" src={cardFavButton} alt=""></img>
      </button>
      <div className="card__image-container">
        <div className="card__circle" />
        <img
          className="card__image"
          src={props.card.image ?? pokeball_bw}
          alt={`Imagen de ${props.card.name}`}
        />
      </div>
      <p className="card__pokemon-type">{props.card.types.join(", ")}</p>
    </li>
  );
}

export default Card;
