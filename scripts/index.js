//  Карточки "из коробки"
const initialCards = [
    {
      name: 'Москва',
      link: './images/Moscow.jpg'
    },
    {
      name: 'Владивосток',
      link: './images/Vladivostok.jpg'
    },
    {
      name: 'Санкт-Петербург',
      link: './images/SPB.jpg'
    },
    {
      name: 'Волгоград',
      link: './images/Volgograd.jpg'
    },
    {
      name: 'Казань',
      link: './images/Kazan.jpg'
    },
    {
      name: 'Рускеала',
      link: './images/Ruskeala.jpg'
    }
  ];

//  Определение переменных
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.popup__content');
const popupCards = document.querySelector('.popup_type_picture');
const popupCloseCards = popupCards.querySelector('.popup__close');
const formCards = popupCards.querySelector('.popup__content');
const popupImage = document.querySelector('.popup_type_image');
const popupCloseImage = popupImage.querySelector('.popup__close');
const popupName = document.querySelector('#name');
const popupStatus = document.querySelector('#status');
const popupPlace = document.querySelector('#place');
const popupLink = document.querySelector('#link');
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
          
popupCloseImage.addEventListener('click', () => {
  popupClose(popupImage);
});
          
            //  Добавить из коробки, лайк, удалить, увеличить:
initialCards.forEach(createCards)
function createCards (item) {
  const cloneTemplate = cardsTemplate.cloneNode(true);
  const elementTitle = cloneTemplate.querySelector('.element__title');
  const elementPhoto = cloneTemplate.querySelector('.element__photo');
  const elementTrash = cloneTemplate.querySelector('.element__trash');
  const elementLike = cloneTemplate.querySelector('.element__heart');

  elementTitle.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;
  elementsList.append(cloneTemplate);

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

            //  Открыть/закрыть попап, отправка формы
addButton.addEventListener('click', () => {
  popupOpen(popupCards);
});

popupCloseCards.addEventListener('click', () => {
  popupClose(popupCards);
});

function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const newCard = createCards ({
    name: popupPlace.value,
    link: popupLink.value
  });
  elementsList.prepend(newCard);
  evt.target.reset();
  popupClose(popupCards);
}
formCards.addEventListener('submit', handleFormCardsSubmit);

//  Профиль: открыть\закрыть попап, отправка формы
editButton.addEventListener('click', () => {
  popupOpen(popupProfile);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
});

popupCloseProfile.addEventListener('click', () => {
  popupClose(popupProfile);
});

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    popupClose (popupProfile);
}
formProfile.addEventListener('submit', handleFormProfileSubmit);
