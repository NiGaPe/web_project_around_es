export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("click", closeOnOutsideClick);
  document.addEventListener("keydown", closeOnEscape);
}
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeOnOutsideClick);
  document.removeEventListener("keydown", closeOnEscape);
}
function closeOnOutsideClick(event) {
  if (!event.target.classList.contains("popup")) return;

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    closeModal(openedPopup);
    console.log("Clicked outside the popup, closing popup");
  }
}
function closeOnEscape(event) {
  if (event.key !== "Escape") return;

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    closeModal(openedPopup);
    console.log("Escape key pressed, closing popup");
  }
}
