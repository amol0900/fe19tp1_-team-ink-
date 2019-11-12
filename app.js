var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
/* var preciousContent = document.querySelector('#deltaContent'); */
var justHtmlContent = document.querySelector('#noteList ul');

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
window.addEventListener('DOMContentLoaded', (event) => {
	loadNotes();
	//renderNotes();

});


function deleteNote (id) {
	// hitta ett objekt i arrayen vars id matchar id, ta bort. hur? se slutet av videon
}
function renderNotes() {
	var justHtmlContent = document.querySelector('#noteList ul');
	justHtmlContent.innerHTML = "";
	noteList.forEach(note => {

		
		 //justHtmlContent.innerHTML += '<li id=' + note.id + '>' + note.preview + '</li>';
		justHtmlContent.innerHTML += `<li id='${note.id}'>${note.preview}</li>`;
		//var span = document.createElement('span');
		//span.innerText = note.id;
		
		
	
});

}

function loadNotes() {
	noteList = localStorage.getItem("noteList") ? JSON.parse(localStorage.getItem("noteList")) : [];
	renderNotes();
	//console.log("not so early" + notes);
}

function saveNotes() {
	localStorage.setItem("noteList", JSON.stringify(noteList));

}

function newAddNote() {
	let note = {
		id: Date.now(),
		content: editor.getContents(),
		preview: editor.getText(0, 50)
	}
	//var delta = editor.getContents(); 
	//{
		//var justHtml = editor.root.innerHTML;
		//var justHtml = editor.root.innerHTML;
		/* preciousContent.innerHTML = JSON.stringify(delta); */
		//justHtmlContent.innerHTML = '<li>' + note.preview + '</li>';
	//}

	// Create a span for the note id
	//var span = document.createElement('span');
	//span.innerText = note.id;
	//console.log(span.innerText);

	// push notes into array
	noteList.push(note);
	console.log(noteList);
	saveNotes();
	renderNotes();

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