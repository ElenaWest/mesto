export default class Card {
    constructor(item, selectorTemplate, handlePreviewImage, openDeletePopupCard, changeColorLike) {
      this._link = item.link;
      this._name = item.name;
      this._myId = item.myid;
      this._ownerId = item.owner._id;
      this._cardId = item._id;
      this._likes = item.likes;
      this._likesLength = item.likes.length;
      this._handlePreviewImage = handlePreviewImage;
      this._openDeletePopupCard = openDeletePopupCard;
      this._changeColorLike = changeColorLike;
      this._cloneElement = document.querySelector(selectorTemplate).content.querySelector('.element').cloneNode(true);
      this._elementPhoto = this._cloneElement.querySelector('.element__photo');
      this._elementLike = this._cloneElement.querySelector('.element__heart');
      this._elementTrash = this._cloneElement.querySelector('.element__trash');
      this._elementTitle = this._cloneElement.querySelector('.element__title');
      this._number = this._cloneElement.querySelector('.element__number');
    }
    
    _handleLike = () => {
      this._changeColorLike(this._elementLike, this._cardId)
    }
  
    _handleTrash = () => {      
      this._openDeletePopupCard({ card: this, cardId: this._cardId })
    }
  
    _handlePhoto = () => {
      this._handlePreviewImage({title: this._name, link: this._link});
    }
  
    _setEventListener() {
      this._elementLike.addEventListener('click', this._handleLike);
      this._elementTrash.addEventListener('click', this._handleTrash);
      this._elementPhoto.addEventListener('click', this._handlePhoto);
    }

    _changeVisibleForTrash() {
      this._myId === this._ownerId ? this._elementTrash.style.display = 'block' : this._elementTrash.style.display = 'none'
    }

    _checkLikes() {
      this._likes.forEach(element => {
        if (element._id === this._myId) {
          this._elementLike.classList.add('element__heart_active');
          return
        }        
      })
      this._number.textContent = this._likesLength
    }

    toggleLike(likes) {
      this._elementLike.classList.toggle('element__heart_active');
      this._number.textContent = likes.length
    }

    removeCard() {
      this._cloneElement.remove();
      this._cloneElement = null;
    }
  
    createCards() {
      this._elementPhoto.src = this._link;
      this._elementPhoto.alt = `Изображение ${this._name}`;
      this._elementTitle.textContent = this._name;
      this._checkLikes();
      this._changeVisibleForTrash();
      this._setEventListener();
      return this._cloneElement;
    }
  }