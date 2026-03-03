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
openBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    noteCard.classList.remove("hidden")
});
function closeBtn() {
    overlay.classList.add("hidden");
    noteCard.classList.add("hidden");
}
// close
closeCardBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (title !== "" || body !== "") {
        confirmCard.classList.remove("hidden");
    } else {
        closeBtn();
    }
})
// save
confirmSaveBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // e.preventDefault();
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        if (title === "" || body === "") {
            emptyCard.classList.remove("hidden");
            setTimeout(() => emptyCard.classList.add("show"), 10);
            return;
        }
        const note = {
            title,
            body,
            time: new Date().toLocaleString()
        };

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        notes.push(note);

        localStorage.setItem("notes", JSON.stringify(notes));

        form.reset();
        confirmCard.classList.add("hidden");
        closeBtn();

        console.log("Saved in localStorage:", note);
    });
});
// discard
confirmDiscard.addEventListener("click", () => {
    form.reset();
    confirmCard.classList.add("hidden");
    closeBtn();
})

// empty ok
emptyBtn.addEventListener("click",()=>{
    emptyCard.classList.add("hidden");
})


