// Elements
const openBtn = document.getElementById("openCardBtn");
const overlay = document.getElementById("overlay");
const noteCard = document.getElementById("noteCard");
const confirmCard = document.getElementById("confirmCard");
const confirmSaveBtns = document.querySelectorAll(".confirmSave");
const confirmDiscard = document.getElementById("confirmDiscard");
const closeCardBtn = document.getElementById("closeCardBtn");

const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const form = document.getElementById("noteForm");

const emptyCard = document.getElementById("emptyCard");
const emptyBtn = document.getElementById("emptyOk");

const notFound = document.querySelector(".notFound");
const notesContainer = document.getElementById("notesContainer");

const loadingScreen = document.getElementById("loadingScreen");

const searchInput = document.getElementById("searchInput");

let selectedColor = "#7132ca";
let editIndex = null;

// Open note card
openBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  noteCard.classList.remove("hidden");

  // reset form inputs
  form.reset();

  if (editIndex === null) {
    noteCard.style.backgroundColor = "#fff";
    selectedColor = "#7132ca"; 
  } else {
    noteCard.style.backgroundColor = selectedColor;
  }
});

// Close card function
function closeCard() {
  overlay.classList.add("hidden");
  noteCard.classList.add("hidden");
}

// Close button
closeCardBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title !== "" || body !== "") {
    confirmCard.classList.remove("hidden");
  } else {
    closeCard();
  }
});

// Save note
confirmSaveBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let title = titleInput.value.trim();
    let body = bodyInput.value.trim();

    if (!body) {
      emptyCard.classList.remove("hidden");
      overlay.classList.remove("hidden");
      return;
    }

    if (!title) {
      title = "No Title";
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    const note = {
      title,
      body,
      color: selectedColor,
      time: new Date().toLocaleString(),
    };

    if (editIndex !== null) {
      notes[editIndex] = note;
      editIndex = null;
    } else {
      notes.push(note);
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    form.reset();
    closeCard();
    confirmCard.classList.add("hidden");

    checkNotes();
  });
});

// Discard changes
confirmDiscard.addEventListener("click", () => {
  form.reset();
  confirmCard.classList.add("hidden");
  closeCard();
});

// Close empty card
emptyBtn.addEventListener("click", () => {
  emptyCard.classList.add("hidden");
  overlay.classList.add("hidden");
});

// Select color
document.querySelectorAll(".color").forEach((color) => {
  color.addEventListener("click", () => {
    selectedColor = color.dataset.color;
    noteCard.style.backgroundColor = selectedColor;
  });
});

// Load notes when page loads
// window.addEventListener("load", () => {

//   if (loadingScreen) {
//     setTimeout(() => {
//       loadingScreen.classList.add("hidden");
//       checkNotes();
//     }, 800);
//   } else {
//     checkNotes();
//   }

// });

// Check notes
function checkNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (notes.length === 0) {
    notFound.style.display = "flex";
    notesContainer.innerHTML = "";
  } else {
    notFound.style.display = "none";
    renderNotes(notes);
  }
}

// Render notes
// Render notes
function renderNotes(notes) {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    notesContainer.innerHTML += `
    
    <div class="col-md-4 mb-3">

      <div class="card note-item p-3" style="background:${note.color}">

        <div class="note-content">
          <h5>${note.title}</h5>
          <p>${note.body}</p>
        </div>

        <div class="note-footer d-flex justify-content-between align-items-center">

          <small class="note-time">${note.time}</small>

          <div class="note-actions">

            <i class="fa-solid fa-pen edit" data-index="${index}"></i>

            <i class="fa-solid fa-trash delete" data-index="${index}"></i>

          </div>

        </div>

      </div>

    </div>
    
    `;
  });
}

// Delete & Edit
notesContainer.addEventListener("click", (e) => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Delete
  if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    checkNotes();
  }

  // Edit
  if (e.target.classList.contains("edit")) {
    const index = e.target.dataset.index;

    const note = notes[index];

    titleInput.value = note.title;
    bodyInput.value = note.body;

    selectedColor = note.color;

    editIndex = index;

    overlay.classList.remove("hidden");
    noteCard.classList.remove("hidden");
  }
});

// Search
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.toLowerCase();

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchValue) ||
        note.body.toLowerCase().includes(searchValue),
    );

    if (filtered.length === 0) {
      notFound.style.display = "flex";
      notesContainer.innerHTML = "";
    } else {
      notFound.style.display = "none";
      renderNotes(filtered);
    }
  });
}
document.addEventListener("DOMContentLoaded", checkNotes);
