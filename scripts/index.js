let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__input_user_name');
let popupStatus = popup.querySelector('.popup__input_user_status');
let formProfile = popup.querySelector('.popup__content')

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
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    popupClosePush ();
}
formProfile.addEventListener('submit', handleFormProfileSubmit);
