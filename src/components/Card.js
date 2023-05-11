export default class Card {
    constructor(item, selectorTemplate, handlePreviewImage) {
      this._item = item;
      this._link = item.link;
      this._name = item.title;
      this._selectorTemplate = selectorTemplate;
      this._handlePreviewImage = handlePreviewImage;
    }
  
    _getCloneTemplate() {
      return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
    }
  
    _handleLike = () => {
      this._elementLike.classList.toggle('element__heart_active');
    }
  
    _handleTrash = () => {
      this._cloneElement.remove();
      this._cloneElement = null;
    }
  
    _handlePhoto = () => {
      this._handlePreviewImage(this._item);
    }
  
    _setEventListener() {
      this._elementLike.addEventListener('click', this._handleLike);
      this._elementTrash.addEventListener('click', this._handleTrash);
      this._elementPhoto.addEventListener('click', this._handlePhoto);
    }
  
    createCards() {
      this._cloneElement = this._getCloneTemplate();
      this._elementPhoto = this._cloneElement.querySelector('.element__photo');
      this._elementLike = this._cloneElement.querySelector('.element__heart');
      this._elementTrash = this._cloneElement.querySelector('.element__trash');
      this._elementTitle = this._cloneElement.querySelector('.element__title');
      this._elementPhoto.src = this._link;
      this._elementPhoto.alt = `Изображение ${this._name}`;
      this._elementTitle.textContent = this._name;
      this._setEventListener();
      return this._cloneElement;
    }
  }