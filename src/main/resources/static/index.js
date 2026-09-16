const table = document.getElementById("charactersTable");
const status = document.getElementById("status");

async function loadCharacters() {
    try {
        const response = await fetch("/characters");
        if (!response.ok) throw new Error("HTTP " + response.status);

        const characters = await response.json();
        table.replaceChildren();
        characters.forEach(addCharacterRow);
        status.textContent = characters.length + " personnage(s) trouve(s).";
    } catch (error) {
        status.textContent = "Impossible de charger les personnages.";
        console.error(error);
    }
}

function addCharacterRow(character) {
    const row = document.createElement("tr");
    row.dataset.id = character.id;

    const firstname = createInput(character.firstname);
    const lastname = createInput(character.lastname);
    const univers = createInput(character.univers || "");
    const actions = document.createElement("td");

    const modifyButton = document.createElement("button");
    modifyButton.textContent = "Modifier";
    modifyButton.addEventListener("click", () => updateCharacter(row));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => deleteCharacter(character));

    actions.append(modifyButton, deleteButton);
    row.append(createCell(firstname), createCell(lastname), createCell(univers), actions);
    table.appendChild(row);
}

function createInput(value) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = value || "";
    return input;
}

function createCell(content) {
    const cell = document.createElement("td");
    cell.appendChild(content);
    return cell;
}

async function updateCharacter(row) {
    const inputs = row.querySelectorAll("input");
    const character = {
        id: Number(row.dataset.id),
        firstname: inputs[0].value,
        lastname: inputs[1].value,
        univers: inputs[2].value
    };

    try {
        const response = await fetch("/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(character)
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        status.textContent = "Personnage modifie.";
    } catch (error) {
        status.textContent = "Impossible de modifier le personnage.";
        console.error(error);
    }
}

async function deleteCharacter(character) {
    const confirmed = window.confirm(
        "Supprimer " + character.firstname + " " + character.lastname + " ?"
    );
    if (!confirmed) return;

    try {
        const response = await fetch("/delete/" + character.id, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        await loadCharacters();
    } catch (error) {
        status.textContent = "Impossible de supprimer le personnage.";
        console.error(error);
    }
}

loadCharacters();
