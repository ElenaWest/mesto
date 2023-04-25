//   Импорты
import initialCards from './cards.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//  Определение переменных
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = document.forms.profile;
const popupCards = document.querySelector('.popup_type_picture');
const formCards = document.forms.picture;
const popupImage = document.querySelector('.popup_type_image');
const popupCloseButtonElements = document.querySelectorAll('.popup__close');
const inputNamePopupProfile = document.querySelector('.popup__input_user_name');
const inputStatusPopupProfile = document.querySelector('.popup__input_user_status');
const inputPlacePopupAddNewCard = document.querySelector('.popup__input_place_name');
const inputLinkPopupAddNewCard = document.querySelector('.popup__input_picture_link');
const elements = document.querySelector('.elements');
const elementsList = elements.querySelector('.elements__list');
const selectorTemplate = '#cardsTemplate';
const avatar = document.querySelector('.profile__avatar');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'span_type_error',
  errorClass: 'popup__error_visible'
};

//  Функции открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closePopupByClickOnOverlay);
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}

function closePopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByClickOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popupCloseButtonElements.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup);
  })
});

//  Запуск валидации попапов профиля и карточки
const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation()

const formCardsValidation = new FormValidator(validationConfig, formCards);
formCardsValidation.enableValidation()
 
//  Карточки
            //  Открыть попап с картинкой 
const imagePreview = popupImage.querySelector('.popup__image');
const imageFigcaption = popupImage.querySelector('.popup__figcaption');

function handlePreviewImage(item) {
  openPopup(popupImage);
  imagePreview.src = item.link;
  imagePreview.alt = item.name;
  imageFigcaption.textContent = item.name;  
}          

            //  Функция добавления карточки
function addCard(container, card) {
  container.prepend(card);
}

initialCards.forEach((element) => {
     addCard(elementsList, createNewCards(element));
});

            //  Открыть/закрыть попап, отправка формы
addButton.addEventListener('click', () => {
  openPopup(popupCards);
  formCards.reset();
  formCardsValidation.resetErrorForOpenForm();
});

           //  Создание новых карточек
function createNewCards(element) {
  const card = new Card(element, selectorTemplate, handlePreviewImage);
  const cardElement = card.createCards();
  return cardElement;
}

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardsParameters = {name: inputPlacePopupAddNewCard.value, link: inputLinkPopupAddNewCard.value};
  addCard(elementsList, createNewCards(cardsParameters));
  closePopup(popupCards);
});
      
//  Профиль: открыть\закрыть попап, отправка формы
function editProfile() {
  inputNamePopupProfile.value = profileName.textContent;
  inputStatusPopupProfile.value = profileStatus.textContent;
}

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  formProfile.reset();
  formProfileValidation.resetErrorForOpenForm();
  editProfile(); 
});

function handleFormProfileSubmit(evt) {
    profileName.textContent = inputNamePopupProfile.value;
    profileStatus.textContent = inputStatusPopupProfile.value;
    evt.preventDefault();
    closePopup(popupProfile);
}
formProfile.addEventListener('submit', handleFormProfileSubmit);

// Открытие попапа с аватаром
avatar.addEventListener('click', () => {
  const avatarItem = {name: avatar.alt, link: avatar.src};
  handlePreviewImage(avatarItem);
  openPopup(popupImage);
});


