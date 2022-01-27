import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../constexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [ name, setName ] = React.useState('')
    const [ description, setDescription ] = React.useState('')
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    function changeName(evt) {
        setName(evt.target.value)
    }

    function changeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onSubmit({
            name_profile: name,
            type_of_profession: description
        });
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);    
        }
    }, [ props.isOpen, currentUser ]);

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={'Редактировать профиль'} 
            name={'form_edit'}
            onCloseOnOverlay={props.onCloseOnOverlay}>
                <input 
                    type="text" 
                    name="name_profile" 
                    className="popup__input popup__subtitle" 
                    id="profile_name" 
                    placeholder="Имя" 
                    minLength="2" 
                    maxLength="40" 
                    required
                    onChange={changeName} 
                    value={name} 
                />
                <span className="popup__error" id="input-name-error"/>
                <input 
                    type="text" 
                    name="type_of_profession" 
                    className="popup__input popup__subtitle" 
                    id="input-subtitle" 
                    placeholder="Профессиональная деятельность" 
                    minLength="2" 
                    maxLength="200"
                    required 
                    onChange={changeDescription} 
                    value={description} 
                />
                <span className="popup__error" id="input-subtitle-error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup