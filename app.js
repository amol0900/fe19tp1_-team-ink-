/* var options = {
	placeholder: 'Write your notes here',
	theme: 'snow'
}; */

var editor = new Quill('#editor', {
  placeholder: 'Write your notes here',
  theme: 'snow'
});

/* var editor = new Quill('#quillEditor', options); */


var noteList = [];
var selectedNote;

// Laddar in anteckingen man klickar på i previewlistan till editorn

/* var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function (e) {
	let clickedID = e.target.closest('button').id;
	console.log('clickedID: ' + clickedID);
	selectedNote = noteList.find((note) => note.id === Number(clickedID));
	console.log(selectedNote);
	editor.setContents(selectedNote.content);
}); */

var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function (e) {
  let clickedID = e.target.closest('li').id;
  console.log('clickedID: ' + clickedID);
  selectedNote = noteList.find((note) => note.id === Number(clickedID));
  console.log(selectedNote);

  // undersök om klicket var på knappen
  console.log(e.target.classList.contains("fav"))
  if (e.target.classList.contains("fav")) {
    // vi har klickat på mar favourite-knappen
    selectedNote.favourite = !selectedNote.favourite;
    saveNotes();

  } else {
    // vi har klickat någon annan stans
    editor.setContents(selectedNote.content);
  }
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
  justHtmlContent.innerHTML = '';
  noteList.forEach(renderNote);
}

// Skapar en preview av anteckingen och lägger till den i DOMen

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
  ).innerHTML += `<li id='${note.id}'><p class="title">${title}</p><br><p class="created">${note.created}</p>
	<button id="favourite" class="fav"></button></li>`;
}



// Sparar anteckningarna i local storage

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(noteList));
}

// Hämtar anteckningarna från local storage

function loadNotes() {
  noteList = localStorage.getItem('notes')
    ? JSON.parse(localStorage.getItem('notes'))
    : [];
  renderNotes();
}

// En funktion som skriver ut vilket datum och tid det är

function showDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // zero indexed, så +1 visar rätt månad;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  // Om minutes inte är högre än nio, lägg till en nolla före minutes
  minutes = minutes > 9 ? minutes : '0' + minutes;
  let finalTime = `${year}-${month}-${day} at ${hours}:${minutes}`;
  //bug - om "minutes" är mindre än 10 visas ex: 20:8 när det ska vara 20:08. If statement för att lösa?
  return finalTime;
}



/* document.getElementById("todays_date").innerHTML = showdate(); */

// Kopplad till "Save note"-knappen, lägger till anteckningen, pushar i den i arrayen
// sen kör den saveNotes och renderNotes

function AddNote() {
  let note = {
    id: Date.now(),
    created: showDate(),
    content: editor.getContents(),
    preview: editor.getText(0, 50),
  };

  noteList.push(note);
  console.log(noteList);

  saveNotes();
  renderNotes();

}





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


