import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._imagePopupFigcaption = this._popup.querySelector('.popup__figcaption')
    }

    open = (item) => {
        this._popupImage.src = item.link;
        this._popupImage.alt = `Изображение ${item.title}`;
        this._imagePopupFigcaption.textContent = item.title;
        super.open()
    }
}