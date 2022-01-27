import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
    const [ name, setName ] = React.useState('')
    const [ link, setLink ] = React.useState('')

    function handleAddName(e) {
        setName(e.target.value)
    }

    function handleAddImage(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onSubmit({
            name: name,
            link: link
        })
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName('')
            setLink('')
        }
    },[props.isOpen])


    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={'Новое место'} 
            name={'form_add'}
            onCloseOnOverlay={props.onCloseOnOverlay}>
                <input 
                    type="text" 
                    name="name" 
                    className="popup__input popup__subtitle" 
                    id="profile_name" 
                    placeholder="Название" 
                    minLength="2" 
                    maxLength="30" 
                    required 
                    onChange={handleAddName}
                    value={name}
                />
                <span className="popup__error" id="input-name-adding-error"/>
                <input 
                    type="url" 
                    name="link" 
                    className="popup__input popup__subtitle" 
                    id="input-link" 
                    placeholder="Ссылка на картинку" 
                    required 
                    onChange={handleAddImage}
                    value={link}    
                />
                <span className="popup__error" id="input-link-error"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup