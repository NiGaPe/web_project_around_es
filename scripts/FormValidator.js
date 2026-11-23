export class FormValidator {
  constructor(config, formElement) {
    //config is an object that contains selectors and form class names, formElement is  the form element to be validated.
    this._config = config;
    this._formElement = formElement;
    this._inputs = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );
    this._submitBtn = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
  }

  setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => this._inputValidation(input));
    });

    this._formElement.addEventListener("submit", (event) => {
      let formValid = true;

      this._inputs.forEach((input) => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
          formValid = false;
        }
      });

      if (!formValid) {
        event.preventDefault();
      }
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }

  _inputValidation(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
    this._toggleButtonState();
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorVisibleClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorVisibleClass);
  }

  _toggleButtonState() {
    const allValid = Array.from(this._inputs).every(
      (input) => input.validity.valid,
    );
    this._submitBtn.disabled = !allValid;
    this._submitBtn.classList.toggle(
      this._config.inactiveButtonClass,
      !allValid,
    );
  }
}
