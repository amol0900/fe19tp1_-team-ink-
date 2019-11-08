var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
/* var preciousContent = document.querySelector('#deltaContent'); */
var justHtmlContent = document.querySelector('#notes ul');

editor.on('text-change', function () {
	var delta = editor.getContents();
	var justHtml = editor.root.innerHTML;
	/* preciousContent.innerHTML = JSON.stringify(delta); */
	justHtmlContent.innerHTML = '<li>' + justHtml + '</li>';
});

/* $('#saveDelta').click(function (){
	window.delta = editor.getContents();
	console.log(window.delta);
}); */

var notes = [];

function loadNotes() {
	notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
	console.log("not so early" + notes);
}

function saveNotes() {
	localStorage.setItem("notes", JSON.stringify(notes));
	window.addEventListener('DOMContentLoaded', (event) => {
		loadNotes();

	});
}


function newAddNote() {
	let note = {
		id: Date.now(),
		content: editor.getContents(),
	}


	// Create a span for the note id
	var span = document.createElement('span');
	span.innerText = note.id;
	console.log(span.innerText);

	// push notes into array
	notes.push(note);
	console.log(notes);
	saveNotes();

};

// Placeholders


// Further Reading:
//https://quilljs.com/guides/working-with-deltas/
//https://github.com/quilljs/quill/issues/774






















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