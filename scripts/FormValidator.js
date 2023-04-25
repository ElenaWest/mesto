export default class FormValidator {
    constructor(config, form) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._form = form;
      this._saveButton = form.querySelector(this._submitButtonSelector);
      this._inputList = form.querySelectorAll(this._inputSelector)
    }
  
    _hideInputError() {
      this._input.classList.remove(this._inputErrorClass);
      this._errorText.textContent = '';
      this._errorText.classList.remove(this._errorClass);
    }
  
    _showInputError() {
      this._input.classList.add(this._inputErrorClass);
      this._errorText.textContent = this._input.validationMessage;
      this._errorText.classList.add(this._errorClass);
    }
  
    _disableButton() {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
    }
  
    _enableButton() {
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.disabled = false;
    }
    
    _hasValidInput() {
      return Array.from(this._inputList).every((input) => input.validity.valid);
    }
  
    _toggleButtonState() {
      this._hasValidInput() ? this._enableButton() : this._disableButton(this._saveButton);
    }
  
    _checkInputValidity() {
      this._errorText = document.querySelector(`#${this._input.id}-error`);
      this._input.validity.valid ? this._hideInputError() : this._showInputError();
    }
  
    _setEventListener() {
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._input = input;  
          this._checkInputValidity();
          this._toggleButtonState();
        })
      })
    }
  
    enableValidation() {
      this._setEventListener();
    }
  
    resetErrorForOpenForm() {
      this._inputList.forEach((input) => {
        this._input = input;
        this._errorText = document.querySelector(`#${this._input.id}-error`);
        if (!input.validity.valid) {
          this._hideInputError()
        }
      })
      this._disableButton()
    }
  }