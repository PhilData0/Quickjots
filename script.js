let currentEditingCard = null;

const modal = document.getElementById("noteModal");
const noteTextarea = document.getElementById("noteTextarea");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const closeModalBtn = document.getElementById("closeModalBtn");


function addCard() {
  const newCard = document.createElement("div");
  newCard.className = "card animate";

  // Editable title
  const editableDiv = document.createElement("div");
  editableDiv.className = "editable";
  editableDiv.contentEditable = true;
  editableDiv.innerText = "New Card";

  // Buttons container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-group";

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = () => newCard.remove();

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerText = "Edit";
  editBtn.onclick = () => {
  currentEditingCard = newCard;
  noteTextarea.value = newCard.getAttribute("data-note") || "";
  modal.style.display = "flex";
};


  // Assemble buttons
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  // Assemble card
  newCard.appendChild(editableDiv);
  newCard.appendChild(buttonContainer);

  // Insert after plus card
  const container = document.getElementById("cardContainer");
  const plusCard = container.querySelector(".plus-card");
  if (plusCard.nextSibling) {
    container.insertBefore(newCard, plusCard.nextSibling);
  } else {
    container.appendChild(newCard);
  }

  editableDiv.focus();

  // Remove animation class after it plays
  newCard.addEventListener("animationend", () => {
    newCard.classList.remove("animate");
  });
}

// Close modal
closeModalBtn.onclick = () => {
  modal.style.display = "none";
  currentEditingCard = null;
};

// Save note
saveNoteBtn.onclick = () => {
  if (currentEditingCard) {
    currentEditingCard.setAttribute("data-note", noteTextarea.value);
  }
  modal.style.display = "none";
  currentEditingCard = null;
};

// Close modal on outside click
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    currentEditingCard = null;
  }
};
