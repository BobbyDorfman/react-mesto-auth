import '../index.css';

const date = new Date().getFullYear()

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {date} Mesto Russia</p>
        </footer>
  );
}

export default Footer;
