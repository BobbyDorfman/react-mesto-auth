import '../index.css';
import logoHeader from '../image/Vector.svg';


function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="Логотип"/>
        </header>
    );
}

export default Header;
