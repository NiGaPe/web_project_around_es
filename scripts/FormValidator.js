export class FormValidator {
  constructor(config, formElement) {
    //config is an object that contains selectors and form class names, formElement is  the form element to be validated.
    this._config = config;
    this._formElement = formElement;
  }

  setEventListeners() {
    const inputs = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );
    const submitBtn = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );

    this._toggleButtonState(inputs, submitBtn);

    inputs.forEach((input) => {
      input.addEventListener("input", () =>
        this._inputValidation(inputs, submitBtn, input),
      );
    });

    this._formElement.addEventListener("submit", (event) => {
      let formValid = true;

      inputs.forEach((input) => {
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
    const inputs = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );
    const submitBtn = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );

    inputs.forEach((input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState(inputs, submitBtn);
  }

  _inputValidation(formInputs, submitBtn, input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
    this._toggleButtonState(formInputs, submitBtn);
  }

  _showInputError(element, errorMessage) {
    const errorElement = element.form.querySelector(`#${element.id}-error`);
    element.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorVisibleClass);
  }

  _hideInputError(element) {
    const errorElement = element.form.querySelector(`#${element.id}-error`);
    element.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorVisibleClass);
  }

  _toggleButtonState(formInputs, submitBtn) {
    const allValid = Array.from(formInputs).every(
      (input) => input.validity.valid,
    );
    submitBtn.disabled = !allValid;
    submitBtn.classList.toggle(this._config.inactiveButtonClass, !allValid);
  }
}
