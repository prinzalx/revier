function showDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'block';
}

function hideDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'none';
}

function showActionModal() {
    showDialog('actionModal');
}

document.getElementById('addImage').addEventListener('click', () => {
    hideDialog('actionModal');
    showDialog('imageInput');
});

document.getElementById('addNote').addEventListener('click', () => {
    hideDialog('actionModal');
    showDialog('noteInput');
});

document.getElementById('cancelAction').addEventListener('click', () => hideDialog('actionModal'));
document.getElementById('cancelImage').addEventListener('click', () => hideDialog('imageInput'));
document.getElementById('cancelNote').addEventListener('click', () => hideDialog('noteInput'));
document.getElementById('closeImageDetails').addEventListener('click', () => hideDialog('imageDetails'));
document.getElementById('closeNoteDetails').addEventListener('click', () => hideDialog('noteDetails'));