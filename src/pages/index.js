import './index.css';
//   Импорты
import Card from '../../src/scripts/components/Card.js';
import FormValidator from '../../src/scripts/components/FormValidator.js';
import PopupWithImage from '../../src/scripts/components/PopupWithImage.js';
import PopupWithForm from '../../src/scripts/components/PopupWithForm.js';
import Section from '../../src/scripts/components/Section.js';
import UserInfo from '../../src/scripts/components/UserInfo.js';
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
} from '../../src/scripts/utils/constants.js'

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
const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue());
  popupProfile.close();
})

const popupTypePicture = new PopupWithForm(popupPictureSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupTypePicture.getInputsValue()));
  popupTypePicture.close();
})

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