//  Определение переменных
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const popupProfile = document.querySelector('.popup_type_profile');
const popupSaveButtonProfile= popupProfile.querySelector('.popup__save-button_profile');
const popupProfileInputs = popupProfile.querySelectorAll('.popup__input');
const formProfile = document.forms.profile;
const popupCards = document.querySelector('.popup_type_picture');
const popupSaveButtonCard = popupCards.querySelector('.popup__save-button_card');
const popupCardInputs = popupCards.querySelectorAll('.popup__input');
const formCards = document.forms.picture;
const popupImage = document.querySelector('.popup_type_image');
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtonElements = document.querySelectorAll('.popup__close');
const inputNamePopupProfile = document.querySelector('.popup__input_user_name');
const inputStatusPopupProfile = document.querySelector('.popup__input_user_status');
const inputPlacePopupAddNewCard = document.querySelector('.popup__input_place_name');
const inputLinkPopupAddNewCard = document.querySelector('.popup__input_picture_link');
const elements = document.querySelector('.elements');
const elementsList = elements.querySelector('.elements__list');
const cardsTemplate = document.querySelector('#cards').content.querySelector('.element');
const avatar = document.querySelector('.profile__avatar');

//  Функции открытия и закрытия попапа
function popupOpen(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}

function closePopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector('.popup_opened');
    popupClose(popupOpened);
  }
}

function closePopupByClickOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    popupClose(popupOpened);
  }
}

popupCloseButtonElements.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    popupClose(popup);
  })
});
 
//  Карточки
            //  Открыть попап с картинкой 
const imagePreview = popupImage.querySelector('.popup__image');
const imageFigcaption = popupImage.querySelector('.popup__figcaption');

function handlePreviewImage(popupImageItem) {
  popupOpen(popupImage);
  imagePreview.src = popupImageItem.link;
  imagePreview.alt = popupImageItem.name;
  imageFigcaption.textContent = popupImageItem.name;  
}          

            //Функция добавления карточки
function addCard(card) {
  elementsList.prepend(card);
}            
          
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
  addCard(card);
});

            //  Открыть/закрыть попап, отправка формы
addButton.addEventListener('click', () => {
  popupOpen(popupCards);
  resetErrorForOpenForm(formCards);
  toggleButton(popupCardInputs, popupSaveButtonCard, validationConfig.inactiveButtonClass);
});

function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const newCard = createCards ({
    name: inputPlacePopupAddNewCard.value,
    link: inputLinkPopupAddNewCard.value
  });
  addCard(newCard);
  evt.target.reset();
  popupClose(popupCards);
}

formCards.addEventListener('submit', handleFormCardsSubmit);

//  Профиль: открыть\закрыть попап, отправка формы
function editProfile() {
  inputNamePopupProfile.value = profileName.textContent;
  inputStatusPopupProfile.value = profileStatus.textContent;
}

editButton.addEventListener('click', () => {
  popupOpen(popupProfile);
  resetErrorForOpenForm(formProfile);
  editProfile(); 
  toggleButton(popupProfileInputs, popupSaveButtonProfile, validationConfig.inactiveButtonClass);
});

function handleFormProfileSubmit(evt) {
    profileName.textContent = inputNamePopupProfile.value;
    profileStatus.textContent = inputStatusPopupProfile.value;
    evt.preventDefault();
    popupClose(popupProfile);
}
formProfile.addEventListener('submit', handleFormProfileSubmit);

// Открытие попапа с аватаром
avatar.addEventListener('click', () => {
  const avatarItem = {name: avatar.alt, link: avatar.src};
  handlePreviewImage(avatarItem);
  popupOpen(popupImage);
});
