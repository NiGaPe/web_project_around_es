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
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close");

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

editProfileButton.addEventListener("click", () =>
  handleOpenEditModal(editProfilePopup),
);
editProfileCloseButton.addEventListener("click", () =>
  closeModal(editProfilePopup),
);

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
