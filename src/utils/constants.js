//  Карточки "из коробки"
import VolgogradImage from '../images/Volgograd.jpg';
import KazanImage from '../images/Kazan.jpg';
import RuskealaImage from '../images/Ruskeala.jpg';
import VladivostokImage from '../images/Vladivostok.jpg';
import SPBImage from '../images/SPB.jpg';
import MoscowImage from '../images/Moscow.jpg';

const initialCards = [
    {
      title: 'Волгоград',
      link: VolgogradImage
    },
    {
      title: 'Казань',
      link: KazanImage
    },
    {
      title: 'Рускеала',
      link: RuskealaImage
    },
    {
      title: 'Владивосток',
      link: VladivostokImage
    },
    {
      title: 'Санкт-Петербург',
      link: SPBImage
    },
    {
      title: 'Москва',
      link: MoscowImage
    }
  ];

//  Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//  Селекторы
const selectorTemplate = '#cardsTemplate';
const popupProfileSelector = '.popup_type_profile';
const popupPictureSelector = '.popup_type_picture';
const popupImageSelector = '.popup_type_image';
const elementsListSelector = '.elements__list';

const info = {
  profileNameSelector: '.profile__name',
  profileStatusSelector: '.profile__status'
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
  initialCards,
  editButton,
  addButton,
  selectorTemplate,
  popupProfileSelector,
  popupPictureSelector,
  popupImageSelector,
  elementsListSelector,
  info,
  validationConfig,
  formsValidator
}