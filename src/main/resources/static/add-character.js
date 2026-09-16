const characters = document.getElementById("characters");
const message = document.getElementById("message");

function addCharacterRow() {
    const row = document.createElement("div");
    row.className = "character-fields";
    row.innerHTML = `
        <label>Prenom <input name="firstname" required></label>
        <label>Nom <input name="lastname" required></label>
        <label>Univers <input name="univers" required></label>
    `;
    characters.appendChild(row);
}

document.getElementById("addRow").addEventListener("click", addCharacterRow);
addCharacterRow();

document.getElementById("singleForm").addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    await sendCharacters("/addCharacter", data);
    event.target.reset();
});

document.getElementById("multipleForm").addEventListener("submit", async event => {
    event.preventDefault();
    const data = [...characters.querySelectorAll(".character-fields")].map(row => {
        return Object.fromEntries(new FormData(row));
    });
    await sendCharacters("/addCharacters", data);
});

async function sendCharacters(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        message.textContent = "Personnage(s) ajoute(s) avec succes.";
    } catch (error) {
        message.textContent = "Erreur lors de l'ajout.";
        console.error(error);
    }
}
