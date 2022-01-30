import React, {useState} from "react";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmailInput(evt) {
        setEmail(evt.target.value)
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onLogin(email, password)
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="login__input"
                        placeholder="Email"
                        onChange={handleEmailInput}
                        required
                    />
                    <input
                        type="password"
                        className="login__input"
                        placeholder="Пароль"
                        onChange={handlePasswordInput}
                        required
                    />
                    <button className="login__button" type="submit">Войти</button>
                </form>
            </section>
        </>
    )
}

export default Login;