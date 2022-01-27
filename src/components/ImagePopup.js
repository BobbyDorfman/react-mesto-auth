import closeIcon from '../image/Close_Icon.svg';

function ImagePopup(props) {  
    return (
        <div className={`popup popup_type_image ${props.card ? 'popup_is-opened' : ''}`} onClick={props.onCloseOnOverlay}>
            <div className="image-in-full">
                <button className="popup__close" type="button" onClick={props.onClose}>
                    <img className="popup__close-image" src={closeIcon} alt="Иконка - закрыть" />
                </button>
                <figure className="image-in-full__content">
                    <img className="image-in-full__image" src={props.card ? props.card.link : ''} 
                    alt={props.card ? props.card.name : ''} />
                    <figcaption className="image-in-full__caption">
                        {props.card ? props.card.name : ''}
                    </figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup