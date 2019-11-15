var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
var icons = Quill.import('ui/icons');
icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';

var noteList = [];
var selectedNote;

// Laddar in anteckingen man klickar på i previewlistan till editorn

var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function (e) {
	let clickedID = e.target.closest('li').id;
	console.log("clickedID: " + clickedID);
	selectedNote = noteList.find(note => note.id === Number(clickedID));
	console.log(selectedNote);
	editor.setContents(selectedNote.content);

});

/* Funktionen som gör att en draft av anteckningen spara så fort du skriver (som i evernote)
	Sparar om vi skulle vilja lägga till den igen senare

editor.on('text-change', function () {
	var delta = editor.getContents();
	var justHtml = editor.root.innerHTML;
	justHtmlContent.innerHTML = '<li>' + justHtml + '</li>';
}); */

// Laddar anteckningarna när sidan laddas/refreshas

window.addEventListener('load', (event) => {
	loadNotes();
});


function deleteNote(id) {
	// todo: hitta ett objekt i arrayen vars id matchar id, ta bort. hur? se slutet av videon
}

function renderNotes() {
	var text = editor.getText();
	var justHtmlContent = document.querySelector('#notes ul');
	justHtmlContent.innerHTML = "";
	noteList.forEach(renderNote);
}

function renderNote(note) {
	let title;
	let titleLength = 25;
	if (note.preview.length > titleLength) {
		title = note.preview.substring(0, titleLength) + "...";
	} else {
		title = note.preview.substring(0, titleLength);
	}
	document.querySelector('#notes ul').innerHTML += `<li id='${note.id}'>${title}</li>`;
}

function loadNotes() {
	noteList = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
	renderNotes();
}

// Sparar anteckningarna i local storage

function saveNotes() {
	localStorage.setItem("notes", JSON.stringify(noteList));
}

// Kopplad till "Save note"-knappen, lägger till anteckningen, pushar i den i arrayen
// sen kör den saveNotes och renderNotes

function AddNote() {
	/* 	let title = {
			id: Date.now(),
			content: editor.getContents(),
			preview: editor.getText(0, 12)
		} */

	let note = {
		id: Date.now(),
		content: editor.getContents(),
		preview: editor.getText(0, 50)
	}

	// push notes into array
	noteList.push(note);

	console.log(noteList);
	saveNotes();
	renderNotes();
};



















/* //Quill

var toolbarOptions = [ [ 'bold', 'italic' ], [ 'link', 'image' ] ];

var quill = new Quill('#editor', {
	theme: 'snow'
});

//end Quill

const editor = {};
editor.noteText = document.querySelector('#editor');
editor.addButton = document.querySelector('#formAddButton');
const notes = document.querySelector('.notes ul');
var myNotes = [];
var obj = {};
var count = 0;

// Event Listeners
editor.addButton.addEventListener('click', function (e) {
	e.preventDefault();
	var value = editor.noteText.value;

	//Is stopped if the string is empty
	if (value == '' || value.length == 0) {
		return false;
	}

   /*  if (editor.noteText.value != '') {
        addNote();
	} */

	//push theItem into the array
/* 	obj.name = value;
	myNotes.push(obj);
	console.log(myNotes); */

	//create elements
/* const li = document.createElement('li');
const note = document.createElement('span'); */

	// append to DOM
/* li.appendChild(note);
notes.appendChild(li); */

/* }); */

/* function newAddNote() {
	let note = {
		id: Date.now(),
		text: quill.root.innerHTML
	}
	console.log(quill.root.innerHTML)
	console.log(quill.getContents())
	return (note);
}

function addNote() {
	let deleteButton = document.createElement('span');
	let newnote = newAddNote();
	notes.innerHTML = `<li>${newnote.text}</li>`;
	deleteButton.classList.add('note-delete');
	deleteButton.innerHTML = '&times;';
	notes.appendChild(deleteButton);
	notes.appendChild(note);

	notes.noteText.value = '';
	editor.noteText.focus();

	addListenerDeleteButton(deleteButton);
} */


/* function addListenerDeleteButton(deleteButton) {
	deleteButton.addEventListener('click', function (e) {
		e.stopPropagation();
		deleteNote(e);
	});
}

function deleteNote(e) {
	let eventNote = e.target.parentNode;
	eventNote.parentNode.removeChild(eventNote);
} */