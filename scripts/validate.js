const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
      const inputList = form.querySelectorAll(inputSelector);
      const saveButton =form.querySelector(submitButtonSelector);
      setEventListeners(inputList, saveButton, rest);
      })       
    }

const setEventListeners = (inputList, saveButton, rest) => {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest.inputErrorClass, rest.errorClass);
      toggleButton(inputList, saveButton, rest.inactiveButtonClass);
    })
  })
}

const checkInputValidity = (input, inputErrorClass, errorClass) => {
  const errorText = document.querySelector(`#${input.id}-error`);
  input.validity.valid ? hideInputError(input, errorText, inputErrorClass, errorClass) : showInputError(input, errorText, inputErrorClass, errorClass);
}

const hideInputError = (input, errorText, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);
  errorText.textContent = '';
  errorText.classList.remove(errorClass);
}

const showInputError = (input, errorText, inputErrorClass, errorClass) => {
  input.classList.add(inputErrorClass);
  errorText.textContent = input.validationMessage;
  errorText.classList.add(errorClass);
}

const toggleButton = (inputList, saveButton, inactiveButtonClass) => {
  hasValidInput(inputList) ? enableButton(saveButton, inactiveButtonClass) : disableButton(saveButton, inactiveButtonClass);
}

const hasValidInput = (inputList) => {
  return Array.from(inputList).every((input) => input.validity.valid)
}

const enableButton = (saveButton, inactiveButtonClass) => {
  saveButton.classList.remove(inactiveButtonClass);
  saveButton.disabled = false;
}

const disableButton = (saveButton, inactiveButtonClass) => {
  saveButton.classList.add(inactiveButtonClass);
  saveButton.disabled = true;
}

enableValidation(validationConfig);

const resetErrorForOpenForm = (form) => {
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
  const errorText = document.querySelector(`#${input.id}-error`); 
  if (!input.validity.valid) {
    hideInputError(input, errorText, validationConfig.inputErrorClass, validationConfig.errorClass);
  } 
  })
}




