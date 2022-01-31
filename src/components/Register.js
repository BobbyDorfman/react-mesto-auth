import '../index.css';
import {Link} from "react-router-dom";
import {useState} from "react";

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleMailInput(evt) {
        setEmail(evt.target.value)
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        props.handleRegister(email, password)
    }

    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    className="login__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleMailInput}
                />
                <input
                    className="login__input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordInput}
                />
                <button className="login__button" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
            </form>
            <p className="login__text">Уже зарегистрированы? 
                <Link className="login__link" to="/sign-in"> Войти</Link>
            </p>
        </section>
    )
}

export default Register