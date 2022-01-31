import '../index.css';
import logoHeader from '../image/Vector.svg';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="Логотип"/>
            <nav className="header__nav">
                <p className="header__text">{props.mail}</p>
                <Link className="header__link" to={props.route} type="button" onClick={props.onClick}>{props.title}</Link>
            </nav>
        </header>
    );
}

export default Header;
