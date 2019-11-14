var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);

// gör ul:en klickbar
// se till att callback-funktionen loggar rätt id. (e.target.id) CHECK
// hur hittar vi ett element ur noteList vars id matchar e.target.id?
// spana in array.find och googla det om objekt
// lägg in detta i selectedNote, uppdatera editorn med setContents(....)

var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function(evt) {
	console.log(evt.target.closest('li').id);
});

/* editor.on('text-change', function () {
	var delta = editor.getContents();
	var justHtml = editor.root.innerHTML;
	justHtmlContent.innerHTML = '<li>' + justHtml + '</li>';
}); */

/* $('#saveDelta').click(function (){
	window.delta = editor.getContents();
	console.log(window.delta);
}); */

var noteList = [];
var selectedNote;

window.addEventListener('DOMContentLoaded', (event) => {
	loadNotes();
	//renderNotes();
});

function deleteNote(id) {
	// hitta ett objekt i arrayen vars id matchar id, ta bort. hur? se slutet av videon
}
function renderNotes() {
	var text = editor.getText();
	var justHtmlContent = document.querySelector('#notes ul');
	justHtmlContent.innerHTML = '';
	noteList.forEach(renderNote);
}

function renderNote(note) {
	let title;
	let titleLength = 25;
	if (note.preview.length > titleLength) {
		title = note.preview.substring(0, titleLength) + '...';
	} else {
		title = note.preview.substring(0, titleLength);
	}
	document.querySelector(
		'#notes ul'
	).innerHTML += `<li id='${note.id}'><strong>${title}: Created: ${note.created} `;
}

function loadNotes() {
	noteList = localStorage.getItem('notes')
		? JSON.parse(localStorage.getItem('notes'))
		: [];
	renderNotes();
	//console.log("not so early" + notes);
}

function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(noteList));
}

function showDate() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1; // zero indexed, så +1 visar rätt månad;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let finalTime = `${year}-${month}-${day} at ${hours}:${minutes}`;
	//bug - om "minutes" är mindre än 10 visas ex: 20:8 när det ska vara 20:08. If statement för att lösa?
	return finalTime;
}

/* document.getElementById("todays_date").innerHTML = showdate(); */

function AddNote() {
	/* 	let title = {
			id: Date.now(),
			content: editor.getContents(),
			preview: editor.getText(0, 12)
		} */

	let note = {
		id: Date.now(),
		created: showDate(),
		content: editor.getContents(),
		preview: editor.getText(0, 50)
	};

	/* let noteCreated = {
		time: new Date()
	}; */

	// push notes into array
	noteList.push(note);
	console.log(noteList);
	saveNotes();
	renderNotes();
}

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
