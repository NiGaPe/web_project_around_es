const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (place) {
  console.log(place["name"]);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.querySelector("#edit-profile-form");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const editProfileCloseBtn = editProfilePopup.querySelector(".popup__close");
const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name",
);
const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description",
);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("click", closeOnOutsideClick);
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeOnOutsideClick);
}
function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileInputs.forEach((input) =>
    inputValidation(profileInputs, editProfileSubmitBtn, input),
  );
}
function handleOpenEditModal(modal) {
  fillProfileForm();
  openModal(modal);
}
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfilePopup);
}

editProfileBtn.addEventListener("click", () =>
  handleOpenEditModal(editProfilePopup),
);
editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfilePopup),
);

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

const cardContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardPopup = document.querySelector("#image-popup");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;

  cardLikeBtn.addEventListener("click", () => {
    console.log("card like button clicked");
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  });

  cardDeleteBtn.addEventListener("click", () => {
    console.log("card delete button clicked");
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    cardPopupImage.src = link;
    cardPopupImage.alt = name;
    cardPopupCaption.textContent = name;
    console.log("card image clicked");
    openModal(cardPopup);
  });

  return cardElement;
}
function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardContainer);
});

const addCardBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");

addCardBtn.addEventListener("click", () => {
  resetNewCardForm();
  openModal(newCardPopup);
});
newCardCloseBtn.addEventListener("click", () => closeModal(newCardPopup));

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardContainer);
  closeModal(newCardPopup);
}
newCardForm.addEventListener("submit", handleCardFormSubmit);

cardPopupCloseBtn.addEventListener("click", () => {
  closeModal(cardPopup);
  console.log("card popup close button clicked");
});

function showInputError(element, errorMessage) {
  const errorElement = element.form.querySelector(`#${element.id}-error`);
  element.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(element) {
  const errorElement = element.form.querySelector(`#${element.id}-error`);
  element.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}

function toggleButtonState(formInputs, submitBtn) {
  const allValid = Array.from(formInputs).every(
    (input) => input.validity.valid,
  );
  submitBtn.disabled = !allValid;
  submitBtn.classList.toggle("popup__button_disabled", !allValid);
}

const profileInputs = editProfileForm.querySelectorAll(".popup__input");
const editProfileSubmitBtn = editProfileForm.querySelector(".popup__button");

function inputValidation(formInputs, submitBtn, input) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
  toggleButtonState(formInputs, submitBtn);
}

profileInputs.forEach((input) => {
  input.addEventListener("input", () =>
    inputValidation(profileInputs, editProfileSubmitBtn, input),
  );
});

editProfileForm.addEventListener("submit", (event) => {
  let formValid = true;

  profileInputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
      formValid = false;
    }
  });

  if (!formValid) {
    event.preventDefault();
  }
});

const cardInputs = newCardForm.querySelectorAll(".popup__input");
const newCardSubmitBtn = newCardForm.querySelector(".popup__button");

function resetNewCardForm() {
  newCardForm.reset();
  cardInputs.forEach(hideInputError);
  toggleButtonState(cardInputs, newCardSubmitBtn);
}

cardInputs.forEach((input) => {
  input.addEventListener("input", () =>
    inputValidation(cardInputs, newCardSubmitBtn, input),
  );
});

newCardForm.addEventListener("submit", (event) => {
  let formValid = true;

  cardInputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
      formValid = false;
    }
  });

  if (!formValid) {
    event.preventDefault();
  }
});

function closeOnOutsideClick(event) {
  if (!event.target.classList.contains("popup")) return;

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    closeModal(openedPopup);
    console.log("Clicked outside the popup, closing popup");
  }
}
