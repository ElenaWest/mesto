import './index.css';
//   Импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
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
} from '../utils/constants.js'

const userInfo = new UserInfo(info);

const popupImage = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, selectorTemplate, popupImage.open);
    return card.createCards();
  }
}, elementsListSelector)

//  Добавление начальных карточек на страницу
section.addCardFromArray()

//  Создание экземпляров формы
const popupProfile = new PopupWithForm(popupProfileSelector, (values) => {
  userInfo.setUserInfo(values);
});

const popupTypePicture = new PopupWithForm(popupPictureSelector, (values) => {
  section.addItem(values);
});

//  Валидация форм
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationConfig, item);
  const name = item.getAttribute('name');
  formsValidator[name] = form;
  form.enableValidation()
})

//  Обработчики событий клика на оверлей и кнопку закрытия попапа
popupTypePicture.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners()

//  Открытие попапа с карточками
addButton.addEventListener('click', () => {
  formsValidator.card.resetErrorForOpenForm();
  popupTypePicture.open();
});
 
//  Открытие попапа профиля
editButton.addEventListener('click', () => {
  formsValidator.profile.resetErrorForOpenForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();    
});