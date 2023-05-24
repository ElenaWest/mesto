export default class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        //this._initialCards = items;
        this._renderer = renderer;
    }
    
    addCardFromArray(data){
        data.forEach(element => {
            this._renderer(element)
        })
    }

    addItemPrepend(domElement) {
        this._container.prepend(domElement);
    }

    addItemAppend(domElement) {
        this._container.append(domElement);
    }
}