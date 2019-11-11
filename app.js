var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
var justHtmlContent = document.querySelector('#notes ul');

var notes = [];

function renderNotes() {
	var justHtmlContent = document.querySelector('#notes ul');
	notes.forEach(function(note) {
		justHtmlContent.innerHTML = '<li>' + note.content + '</li>';
		var span = document.createElement('span');
		span.innerText = note.id;
		console.log(span.innerText);
	});
}

function loadNotes() {
	notes = localStorage.getItem('notes')
		? JSON.parse(localStorage.getItem('notes'))
		: [];
	renderNotes();
	console.log('not so early' + notes);
}

function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(notes));
	window.addEventListener('DOMContentLoaded', (event) => {
		loadNotes();
		renderNotes();
	});
}

function newAddNote() {
	let note = {
		id: Date.now(),
		content: editor.getContents()
	};
	var delta = editor.getContents();
	{
		var justHtml = editor.root.innerHTML;
		/* preciousContent.innerHTML = JSON.stringify(delta); */
		justHtmlContent.innerHTML = '<li>' + justHtml + '</li>';
	}

	// Create a span for the note id
	var span = document.createElement('span');
	span.innerText = note.id;
	console.log(span.innerText);

	// push notes into array
	notes.push(note);
	console.log(notes);
	saveNotes();
}

// Placeholders

// Further Reading:
//https://quilljs.com/guides/working-with-deltas/
//https://github.com/quilljs/quill/issues/774
