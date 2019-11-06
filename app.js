//Quill

var toolbarOptions = [['bold', 'italic'], ['link', 'image']];

var quill = new Quill('#editor', {
    theme: 'snow'
});

//end Quill

const editor = {}
editor.noteText = document.querySelector('#editor');
editor.addButton = document.querySelector('#formAddButton');

const notes = document.querySelector('.notes ul');

function newAddNote() {
    let note = {
        id: Date.now(),
        text: quill.root.innerHTML
    }
    console.log(quill.root.innerHTML)
    console.log(quill.getContents())
    return (note);
}

function addNote() {
    /* let text = editor.noteText.value; */
    /* let note = document.createElement('div'); */
    /* let li = document.createElement('li'); */
    let deleteButton = document.createElement('span');

    let newnote = newAddNote();
    /* note.classList.add('note'); */
    notes.innerHTML = `<li>${newnote.text}</li>`;
    deleteButton.classList.add('note-delete');
    deleteButton.innerHTML = '&times;';
    notes.appendChild(deleteButton);
    notes.appendChild(note);

    notes.noteText.value = '';
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