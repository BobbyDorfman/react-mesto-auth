import '../index.css';
import Card from "./Card";
import React from "react";
import editIcon from '../image/Edit.svg';
import addButtonIcon from '../image/Add_button.svg';
import { CurrentUserContext } from "../constexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <button className="profile__edit-avatar" type="button" onClick={props.onEditAvatar}></button>
                    <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
                </div>

                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                        <img className="profile__pencil" src={editIcon} alt="Элемент редактирования" />
                    </button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                    <img className="profile__plus" src={addButtonIcon} alt="Знак - добавить" />
                </button>
            </section>

            <section className="elements" aria-label="Фотоальбом">
                {props.cards.map((cards, _id) => (
                    <Card
                    key={_id}
                    card={cards}
                    link={cards.link}
                    name={cards.name}
                    likes={cards.likes.length}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onDeleteCard={props.onDeleteCard}    
                />
                ))}
            </section>
        </main>
    );
}

export default Main;
