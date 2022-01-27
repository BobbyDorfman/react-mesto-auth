import React from "react";
import deleteIcon from '../image/delete_2.svg';
import likeIcon from '../image/Like.svg';
import {CurrentUserContext} from "../constexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__button-delete ${isOwn ? 'element__button-delete_visible' : 'element__button-delete_hidden'}`
    );
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__button ${isLiked ? 'element__button_like-active' : ''}`)

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLike() {
        props.onCardLike(props.card)
    }

    function handleDelete() {
        props.onDeleteCard(props.card)
    }

    return(
        <article className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDelete} type="button">
                <img className="element__delete" src={deleteIcon} alt="Иконка удаления карточки" />
            </button>
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
            <div className="element__down">
                <h2 className="element__title">{props.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLike}>
                        <img className="element__like" src={likeIcon} alt="Лайк" />
                    </button>
                    <span className="element__like-counter">{props.likes}</span>
                </div>
            </div>
        </article>
    )
}

export default Card