function showAddDialog() {
    console.log('Showing add dialog');
    document.getElementById('overlay').style.display = 'block';
    let dialog = document.getElementById('addDialog');
    dialog.style.display = 'block';
    console.log('Dialog display style:', dialog.style.display);
    console.log('Dialog offsetWidth:', dialog.offsetWidth);
    console.log('Dialog offsetHeight:', dialog.offsetHeight);
}

function closeAddDialog() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('addDialog').style.display = 'none';
}

function handleAdd(type) {
    closeAddDialog();
    if (type === 'bild') {
        uploadImage(clickedLatLng);
    } else if (type === 'notiz') {
        addNote(clickedLatLng);
    }
}

document.getElementById('overlay').addEventListener('click', closeAddDialog);

function showImage(image) {
    const container = document.getElementById('imageContainer');
    container.style.display = 'block';
    container.innerHTML = `
        <h2>${image.description}</h2>
        ${image.url ? `<img src="${image.url}" width="300">` : ''}
        <h3>Notizen:</h3>
        <div id="notes">
            ${image.notes ? image.notes.map(note => `
                <div class="note">
                    <p>${note.text}</p>
                    <span class="timestamp">${new Date(note.createdAt).toLocaleString()}</span>
                    <button onclick="deleteNote('${image._id}', '${note._id}')">Löschen</button>
                </div>
            `).join('') : ''}
        </div>
        <form onsubmit="addNoteToImage('${image._id}', this); return false;">
            <input type="text" name="note" required>
            <button type="submit">Notiz hinzufügen</button>
        </form>
        <button onclick="deleteImage('${image._id}')">Löschen</button>
    `;
}
