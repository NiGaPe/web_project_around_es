import { openModal } from "./utils.js";

const cardPopup = document.querySelector("#image-popup");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }
  generateCard() {
    this._card = this._getTemplate();
    this._cardTitle = this._card.querySelector(".card__title");
    this._cardImage = this._card.querySelector(".card__image");
    this._cardLikeBtn = this._card.querySelector(".card__like-button");
    this._cardDeleteBtn = this._card.querySelector(".card__delete-button");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._card;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => this._handleLike());
    this._cardDeleteBtn.addEventListener("click", () => this._handleDelete());
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }
  _handleLike() {
    this._cardLikeBtn.classList.toggle("card__like-button_is-active");
    console.log("card like button clicked");
  }
  _handleDelete() {
    this._card.remove();
    console.log("card delete button clicked");
  }
  _handleImageClick() {
    cardPopupImage.src = this._link;
    cardPopupImage.alt = this._name;
    cardPopupCaption.textContent = this._name;
    console.log("card image clicked");
    openModal(cardPopup);
  }
}
