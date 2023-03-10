let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__editButton');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');
let popup = document.querySelector(".popup")
let popupCloseButton = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__name');
let popupStatus = popup.querySelector('.popup__status');
let saveButton = popup.querySelector('.popup__saveButton');

//   Попап открыт   //
function editButtonPush () {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
}
editButton.addEventListener('click', editButtonPush);
//   Попап закрыт   //
function popupClosePush () {
    popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', popupClosePush);
//   Отправка формы  //
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value; 
    profileStatus.textContent = popupStatus.value;   
}
saveButton.addEventListener('submit', handleFormSubmit); 