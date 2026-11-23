import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { closeModal, openModal } from "./utils.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
  inactiveButtonClass: "popup__button_disabled",
};

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

const cardContainer = document.querySelector(".cards__list");

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, "#card-template");
  const cardElement = card.generateCard();
  renderCard(cardElement, cardContainer);
});

function renderCard(card, container) {
  container.prepend(card);
}

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.querySelector("#edit-profile-form");

const profileValidator = new FormValidator(validationConfig, editProfileForm);
profileValidator.setEventListeners();

const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const editProfileCloseBtn = editProfilePopup.querySelector(".popup__close");
const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name",
);
const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description",
);

function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileValidator.resetValidation();
}
function handleOpenEditModal(modal) {
  fillProfileForm();
  openModal(modal);
}
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!editProfileForm.checkValidity()) {
    return;
  } // Check if the form is valid before proceeding
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

const cardPopup = document.querySelector("#image-popup");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close");

const addCardBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.setEventListeners();

addCardBtn.addEventListener("click", () => {
  resetNewCardForm();
  openModal(newCardPopup);
});
newCardCloseBtn.addEventListener("click", () => closeModal(newCardPopup));

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (!newCardForm.checkValidity()) {
    return;
  } // Check if the form is valid before proceeding

  const card = new Card(
    cardNameInput.value,
    cardLinkInput.value,
    "#card-template",
  );
  renderCard(card.generateCard(), cardContainer);
  closeModal(newCardPopup);
}
newCardForm.addEventListener("submit", handleCardFormSubmit);

cardPopupCloseBtn.addEventListener("click", () => {
  closeModal(cardPopup);
  console.log("card popup close button clicked");
});

function resetNewCardForm() {
  newCardForm.reset();
  newCardValidator.resetValidation();
}
