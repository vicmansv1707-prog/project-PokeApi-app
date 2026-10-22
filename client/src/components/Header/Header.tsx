import  logo  from '../../images/logo.png'
import { NavLink, useLocation } from 'react-router-dom' 


function Header(): React.JSX.Element{
    const location = useLocation();
    const textLink = location.pathname === "/" ? "Sobre el autor" : "Inicio";
    const path = location.pathname === "/" ? "/about" : "/";

    return(
        <>
            <header className='header'>
                <img className="header__logo" src={logo} alt='Pokémon logo'/>            
            <div className='header__navs'>
                <nav className='header__nav'><NavLink to={path}>{textLink}</NavLink></nav>
            </div>
            </header>
        </>
    )
};

export default Header;
