var toolbarOptions = [['bold', 'italic'], ['link', 'image']];

var quill = new Quill('#editor', {
    theme: 'snow'
});

const editor = {}
editor.noteText = document.querySelector('#editor .ql-editor');
editor.addButton = document.querySelector('#formAddButton');
/* form.color = document.querySelector('#formColor'); */

const notes = document.querySelector('#notes');

// Functions
function addNote() {
    let text = editor.noteText.value;
    let note = document.createElement('div');
    let deleteButton = document.createElement('span');

    note.classList.add('note');
    /* note.classList.add(editor.color.value); */
    note.innerHTML = `<div class='note-text'>${text}</div>`;
    deleteButton.classList.add('note-delete');
    deleteButton.innerHTML = '&times;';

    note.appendChild(deleteButton);
    notes.appendChild(note);

    editor.noteText.value = '';
    editor.noteText.focus();

    addListenerDeleteButton(deleteButton);
}

function addListenerDeleteButton(deleteButton) {
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteNote(e);
    });
}

function deleteNote(e) {
    let eventNote = e.target.parentNode;
    eventNote.parentNode.removeChild(eventNote);
}

// Event Listeners
editor.addButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (editor.noteText.value != '') {
        addNote();
    }
})