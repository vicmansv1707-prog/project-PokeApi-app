import pokeball_bw from '../../../images/pokeball_bw.svg'
import pokeball_color from '../../../images/pokeball_color.svg'
import type { CardProps } from '../../../types/types';



function Card(props: CardProps): React.JSX.Element {
    
    const cardFavButton =  props.card.isFav ? pokeball_color : pokeball_bw;

    return (
        <li className="card">
            <h2 className="card__pokemon-name">{props.card.name}</h2>
            <button 
            className="card__fav-button" 
            type="button" 
            aria-label="Cambiar favorito"
            onClick={() => props.handleCardFav(props.card)}>
                <img className=  'card__pokeball-fav' src={cardFavButton} alt='Icono pokémon favorito'></img>
            </button>    
                <div className="card__image-container">
                    <div className="card__circle" />
                    <img 
                    className="card__image" 
                    src={props.card.image ?? pokeball_bw} 
                    alt="Imagen del pokémon"/>
                </div>            
            <h2 className="card__pokemon-type">{props.card.types.join(", ")}</h2>
        </li>
    );
};

export default Card
