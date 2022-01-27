import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onSubmit({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={'Обновить аватар'} 
            name={'form_avatar'}
            onCloseOnOverlay={props.onCloseOnOverlay}>
                <input 
                    ref={avatarRef}
                    type="url" 
                    name="avatar" 
                    className="popup__input popup__subtitle" 
                    id="input-name-avatar" 
                    placeholder="https://somewebsite.com/someimage.jpg" 
                    required 
                />
                <span className="popup__error" id="input-name-avatar-error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup