//  Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//  Аватар
const avatarElement = document.querySelector('.profile__avatar-overlay');

//  Селекторы
const selectorTemplate = '#cardsTemplate';
const popupProfileSelector = '.popup_type_profile';
const popupPictureSelector = '.popup_type_picture';
const popupImageSelector = '.popup_type_image';
const elementsListSelector = '.elements__list';
const popupAvatarSelector = '.popup_type_avatar';
const popupDeleteSelector = '.popup_type_deletecard';

const info = {
  profileNameSelector: '.profile__name',
  profileStatusSelector: '.profile__status',
  profileAvatar: '.profile__avatar'
}

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'span_type_error',
  errorClass: 'popup__error_visible'
};

//  Валидация
const formsValidator = {};

export {
  editButton,
  addButton,
  avatarElement,
  selectorTemplate,
  popupProfileSelector,
  popupPictureSelector,
  popupImageSelector,
  elementsListSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  info,
  validationConfig,
  formsValidator
}