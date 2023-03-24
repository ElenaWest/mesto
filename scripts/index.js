//  Определение переменных
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfileButton = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.popup__content');
const popupCards = document.querySelector('.popup_type_picture');
const popupCloseCardsButton = popupCards.querySelector('.popup__close');
const formCards = popupCards.querySelector('.popup__content');
const popupImage = document.querySelector('.popup_type_image');
const popupCloseImageButton = popupImage.querySelector('.popup__close');
const inputNamePopupProfile = document.querySelector('#inputNamePopupProfile');
const inputStatusPopupProfile = document.querySelector('#inputStatusPopupProfile');
const inputPlacePopupAddNewCard = document.querySelector('#inputPlacePopupAddNewCard');
const inputLinkPopupAddNewCard = document.querySelector('#inputLinkPopupAddNewCard');
const elements = document.querySelector('.elements');
const elementsList = elements.querySelector('.elements__list');
const cardsTemplate = document.querySelector('#cards').content.querySelector('.element');

//  Функции открытия и закрытия попапа
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

//  Карточки
            //  Открыть/закрыть попап с картинкой 
const imagePreview = popupImage.querySelector('.popup__image');
const imageFigcaption = popupImage.querySelector('.popup__figcaption');

function handlePreviewImage(popupImageItem) {
  popupOpen(popupImage);
  imagePreview.src = popupImageItem.link;
  imageFigcaption.textContent = popupImageItem.name;  
}          
          
popupCloseImageButton.addEventListener('click', () => {
  popupClose(popupImage);
});
          
            //  Добавить из коробки, лайк, удалить, увеличить:
function createCards(item) {
  const cloneTemplate = cardsTemplate.cloneNode(true);
  const elementTitle = cloneTemplate.querySelector('.element__title');
  const elementPhoto = cloneTemplate.querySelector('.element__photo');
  const elementTrash = cloneTemplate.querySelector('.element__trash');
  const elementLike = cloneTemplate.querySelector('.element__heart');

  elementTitle.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  elementLike.addEventListener('click', evt => {
    evt.target.classList.toggle('element__heart_active');
  });
  
  elementTrash.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  }); 

  elementPhoto.addEventListener('click', evt => {
    const targetImage = evt.target;
    const item = {
      name: targetImage.alt,
      link: targetImage.src
    };

    handlePreviewImage(item);
  });

  return cloneTemplate;
};

initialCards.forEach((item) => {
  const card = createCards(item);
  elementsList.append(card);
});

            //  Открыть/закрыть попап, отправка формы
addButton.addEventListener('click', () => {
  popupOpen(popupCards);
});

popupCloseCardsButton.addEventListener('click', () => {
  popupClose(popupCards);
});

function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const newCard = createCards ({
    name: inputPlacePopupAddNewCard.value,
    link: inputLinkPopupAddNewCard.value
  });
  elementsList.prepend(newCard);
  evt.target.reset();
  popupClose(popupCards);
}
formCards.addEventListener('submit', handleFormCardsSubmit);

//  Профиль: открыть\закрыть попап, отправка формы
function editProfile () {
  inputNamePopupProfile.value = profileName.textContent;
  inputStatusPopupProfile.value = profileStatus.textContent;
}

editButton.addEventListener('click', (editProfile) => {
  popupOpen(popupProfile);
  editProfile();
});

popupCloseProfileButton.addEventListener('click', () => {
  popupClose(popupProfile);
});

function handleFormProfileSubmit(evt) {
    profileName.textContent = inputNamePopupProfile.value;
    profileStatus.textContent = inputStatusPopupProfile.value;
    evt.preventDefault();
    popupClose (popupProfile);
}
formProfile.addEventListener('submit', handleFormProfileSubmit);
