import React from "react";
import closeIcon from '../image/Close_Icon.svg';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_is-opened`: ""}`} onClick={props.onCloseOnOverlay}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose}>
                    <img className="popup__close-image" src={closeIcon} alt="Иконка - закрыть" />
                </button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.form} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__button">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm