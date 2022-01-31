import {useEffect, useState} from "react";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../constexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import * as auth from "../utils/auth"
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Error from "../image/Error.svg"
import Done from "../image/Done.svg"

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [mail, setMail] = useState(null)
    const [popupImage, setPopupImage] = useState('')
    const [popupText, setPopupText] = useState('')
    const [infoTooltip, setInfoTooltip] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn === true) {
            navigate('/')
        }
    }, [loggedIn, navigate])

    useEffect(() => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    setLoggedIn(true)
                    setMail(res.data.email)
                }
            })
            .catch((err) => {
                console.log(`Токен не передан или передан не в том формате. Ошибка: ${err}`)
            })
        }
    }, [])

    function handleLogin(email, password) {
        auth.login(email, password).then((res) => {
                setLoggedIn(true)
                setMail(email)
                localStorage.setItem('jwt', res.token)
                navigate('/')
            })
            .catch(() => {
                setPopupImage(Error)
                setPopupText('Не верные имя пользователя или пароль.')
                handleInfoTooltip()
            })
    }

    function handleRegister(email, password) {
        auth.register(email, password).then(() => {
                setPopupImage(Done)
                setPopupText("Вы успешно зарегистрировались!")
                navigate('/sign-in')
            })
            .catch(() => {
                setPopupImage(Error)
                setPopupText('Что-то пошло не так! Попробуйте ещё раз.')
            })
            .finally(handleInfoTooltip)
    }

    useEffect(() => {
        Promise.all([api.getInitialCards(), api.getApiUserInfo()])
            .then(([ cards, user ]) => {
                setCards(cards)
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(`Данные не загрузились. Ошибка: ${err}`)
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (!isLiked) {
            api.addLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Что-то пошло не так, Like не поставился. Ошибка: ${err}`)
            });
        } else {
            api.deleteLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Что-то пошло не так, Like не убрался. Ошибка: ${err}`)
            })
        }
    }

    function handleDeleteCard(card) {
        api.deleteCard(card).then(() => {
            setCards((items) => items.filter((c) => c._id !== card._id && c))
        })
        .catch((err) => {
            console.log(`Что-то пошло не так, карточка не удалилась. Ошибка: ${err}`)
        })
    }

    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then((newUser) => {
                setCurrentUser(newUser)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Данные не удалось отправить на сервер. Ошибка: ${err}`)
            })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then((newAvatar) => {
              setCurrentUser(newAvatar)
              closeAllPopups()
            })
            .catch((err) => {
                console.log(`Не удалось сменить аватар. Ошибка: ${err}`)
            })
    }

    function handleAddCard(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Карточку не удалось добавить на сервер. Ошибка: ${err}`)
            })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick (card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard(null)
        setInfoTooltip(false)
    }

    function handleClickOutside(e) {
        if (e.target.classList.contains('popup_is-opened')) {
            closeAllPopups()
        }
    }

    function handleInfoTooltip() {
        setInfoTooltip(true)
    }
 
    function signOut() {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
        setMail(null)
        navigate('/sign-in')
    }

    //Добавляем обработчик Escape 
    useEffect(() => {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard || infoTooltip) {
            const closeByEscape = (e) => {
                if (e.key === 'Escape') {
                    closeAllPopups();
                }
            }
    
            document.addEventListener('keydown', closeByEscape)
            
            return () => document.removeEventListener('keydown', closeByEscape)    
        }
    }, [isAddPlacePopupOpen, isEditProfilePopupOpen, isEditAvatarPopupOpen, selectedCard, infoTooltip])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Routes>
                        <Route path="/sign-in" element={
                            <>
                                <Header title="Регистрация" route="/sign-up" />
                                <Login handleLogin={handleLogin}/>
                            </>
                        }
                        />
                        <Route path="/sign-up" element={
                            <>
                                <Header title="Войти" route="/sign-in"/>
                                <Register handleRegister={handleRegister} />
                            </>
                        }
                        />
                        <Route exact path="/" element={
                            <>
                                <Header title="Выйти" mail={mail} onClick={signOut} route=''/>
                                <>
                                    <ProtectedRoute
                                        component={Main}
                                        loggedIn={loggedIn}
                                        onEditAvatar={handleEditAvatarClick}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onCardClick={handleCardClick}
                                        cards={cards}
                                        onCardLike={handleCardLike}
                                        onDeleteCard={handleDeleteCard} 
                                    />
                                    <Footer />
                                </>
                            </>
                        }
                        />
                        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"}/>} />
                    </Routes>
                </div>

                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleUpdateUser}
                    onCloseOnOverlay={handleClickOutside}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups} 
                    onSubmit={handleAddCard}
                    onCloseOnOverlay={handleClickOutside}
                />

                <EditAvatarPopup 
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups} 
                    onSubmit={handleUpdateAvatar}
                    onCloseOnOverlay={handleClickOutside}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    onCloseOnOverlay={handleClickOutside}
                />

                <InfoTooltip
                    isOpen={infoTooltip}
                    onClose={closeAllPopups}
                    onCloseOnOverlay={handleClickOutside}
                    image={popupImage}
                    text={popupText}
                />

                {/*<div className="popup popup_type_delete">
                    <div className="popup__container">
                        <button className="popup__close" type="button">
                            <img className="popup__close-image" src={closeIcon} alt="Иконка - закрыть" />
                        </button>
                        <h2 className="popup__title">Вы уверены?</h2>
                        <form className="popup__form" name="form_delete" novalidate>
                            <button type="submit" className="popup__button">Да</button>
                        </form>
                    </div>
                </div>*/}

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
