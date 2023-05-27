import './index.css';
//   Импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import {
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
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '0c26d4a4-f51e-405b-92e1-f55fac7bf350',
    'Content-Type': 'application/json'
  }
  });
  
const userInfo = new UserInfo(info);

const popupImage = new PopupWithImage(popupImageSelector);

const deletePopupCard = new PopupDeleteCard(popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard()
      deletePopupCard.close()
    })
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => deletePopupCard.setupText())
})

function createNewCard(element) {
  const card = new Card(element, selectorTemplate, popupImage.open, deletePopupCard.open, (isLiked, cardId) => {
    if (isLiked){
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.addLike(cardId)
      .then(res => {
        card.toggleLike(res.likes)
      })
      .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  });
    return card.createCards();
} 

const section = new Section((element) => {
  section.addItemAppend(createNewCard(element))
  }, elementsListSelector);

//  Создание экземпляров формы
const popupProfile = new PopupWithForm(popupProfileSelector, (values) => {
  api.setUserInfo(values)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, status: res.about, avatar: res.avatar });
      popupProfile.close()
    })
      .catch((error => console.error(`Ошибка при редактировании данных профиля ${error}`)))
      .finally(() => popupProfile.setupText())
});

const popupTypePicture = new PopupWithForm(popupPictureSelector, (values) => {
  api.addCard(values)
  .then(dataCard => {
    dataCard.myid = userInfo.getId()
    section.addItemPrepend(createNewCard(dataCard))
    popupTypePicture.close()
  })
  .catch((error) => console.error(`Ошибка при добавлении новой карточки ${error}`))
  .finally(() => popupTypePicture.setupText())
});  

const popupAvatar = new PopupWithForm(popupAvatarSelector, (values) => {
  api.setNewAvatar(values)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, status: res.about, avatar: res.avatar });
      popupAvatar.close()
    })
      .catch((error) => console.error(`Ошибка при редактировании изображения ${error}`))
      .finally(() => popupAvatar.setupText())
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
popupImage.setEventListeners();
popupAvatar.setEventListeners();
deletePopupCard.setEventListeners();

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

avatarElement.addEventListener('click', () => {
  formsValidator.editAvatar.resetErrorForOpenForm();
  popupAvatar.open()
})

//  Создние начальных данных страницы
Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({ username: dataUser.name, status: dataUser.about, avatar: dataUser.avatar });
    userInfo.setId(dataUser._id);
    section.renderItems(dataCard);
  })
  .catch((error => console.error(`Ошибка при создании начальных данных страницы ${error}`)))