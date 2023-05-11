export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._initialCards = items;
        this._renderer = renderer;
    }
    
    addCardFromArray(){
        this._initialCards.forEach(element => {
            this.addItem(element);
        })
    }

    addItem(values) {
        this._container.prepend(this._renderer(values));
    }
}