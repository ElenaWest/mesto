import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._submitButton = this._form.querySelector('.popup__save-button');
        this._defaultButtonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.textContent = `${this._submitButton.textContent}...`
            this._submitFunction({ card: this._element, cardId: this._cardId });
        })
    }

    setupText() {
        this._submitButton.textContent = this._defaultButtonText
    }

    open = ({ card, cardId }) => {
        super.open();
        this._element = card;
        this._cardId = cardId;
    }
}