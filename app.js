var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
var justHtmlContent = document.querySelector('#notes ul');

editor.on('text-change', function() {
	var delta = editor.getContents();

	// Writing out <p> tags with text </p>
	var justHtml = editor.root.innerHTML;

	// taking var justHtmlContent and adding '<li>' + justHtml + '</li>' under notes ul
	justHtmlContent.innerHTML = '<li>' + justHtml + '</li>';

	console.log(justHtmlContent);
});

/* $('#saveDelta').click(function() {
	window.delta = editor.getContents();
	console.log(window.delta);
}); */

var notes = [];

function newAddNote() {
	let note = {
		id: Date.now(),
		content: editor.getContents()
	};

	// Create a span for the note id
	var span = document.createElement('span');
	span.innerText = note.id;
	console.log(span.innerText);

	// push notes into array
	notes.push(note);
	console.log(notes);

	//local storage

	localStorage.setItem('notes', JSON.stringify(notes));

	alert(notes);

	var savedNotes = JSON.parse(localStorage['notes']);
}
