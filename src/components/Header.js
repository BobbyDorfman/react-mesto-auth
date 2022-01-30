import '../index.css';
import logoHeader from '../image/Vector.svg';
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="Логотип"/>
            <nav className="header__nav">
                <p className="header__text">email@mail.com</p>
                <Link className="header__link" to="/" type="link">Выйти</Link>
            </nav>
        </header>
    );
}

export default Header;
