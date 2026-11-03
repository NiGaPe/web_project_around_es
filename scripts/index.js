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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg,",
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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
function fillProfileForm() {
  editProfilePopup.querySelector(".popup__input_type_name").value =
    profileTitle.textContent;
  editProfilePopup.querySelector(".popup__input_type_description").value =
    profileDescription.textContent;
}
function handleOpenEditModal(modal) {
  fillProfileForm();
  openModal(modal);
}
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  let newName = editProfilePopup.querySelector(".popup__input_type_name").value;
  let newDescription = editProfilePopup.querySelector(
    ".popup__input_type_description",
  ).value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
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
function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;

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

addCardBtn.addEventListener("click", () => openModal(newCardPopup));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardPopup));
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let newCardName = newCardForm.querySelector(
    ".popup__input_type_card-name",
  ).value;
  let newCardLink = newCardForm.querySelector(".popup__input_type_url").value;
  renderCard(newCardName, newCardLink, cardContainer);
  closeModal(newCardPopup);
}
newCardForm.addEventListener("submit", handleCardFormSubmit);
