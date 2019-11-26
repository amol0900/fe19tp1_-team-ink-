/* toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline'], 
  ['link', 'image'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
	['clean'],
	[{ 'customoption': ['[GuestName]', '[HotelName]'] }
]
 */






var options = {
	placeholder: 'Write your notes here',
	theme: 'snow',
	modules: {
		toolbar: { 
			toolbarOptions: 
			[
				[{ 'header': [1, 2, 3, 4, false] }],
				['bold', 'italic', 'underline'],
				['link', 'image'],
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				['clean'],
				[{ 'themes': ['Theme 1', 'Theme 1'] }],				
			],
  handlers: {
				"themes": function (value) {
					if (value) {
						const cursorPosition = this.quill.getSelection().index;
						this.quill.insertText(cursorPosition, value);
						this.quill.setSelection(cursorPosition + value.length);
					}
				}
			}
	}
 }
};

var editor = new Quill('#editor', options);

var noteList = [];
var selectedNote;



// Laddar in anteckingen man klickar på i previewlistan till editorn

var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function(e) {
	let clickedLI = e.target.closest('li');
	//let clickedID = e.target.closest('li').id;
	//console.log('clickedID: ' + clickedID);
	selectedNote = noteList.find((note) => note.id === Number(clickedLI.id));



	// undersök om klicket var på knappen
	
	if (e.target.classList.contains('fav')) {
		console.log("hello world");
		// vi har klickat på favourite-knappen
		selectedNote.favourite = !selectedNote.favourite;
		saveNotes();
 
		e.target.classList.toggle('favFilled');
		//console.log(selectedNote.favourite);
		// här ska saker göras som BARA ska göras när man klickat på fav

	} else {
		console.log("elsewhere")
		// vi har klickat någon annan stans
		editor.setContents(selectedNote.content);

			var myTitle2 = document.getElementById('square');
		myTitle2.setAttribute('value', selectedNote.title);
		

	
	}

	if (e.target.classList.contains('far')){
	noteList = noteList.filter(note => note.id !== Number(clickedLI.id));

	clickedLI.remove();
		editor.setText('');
		document.getElementById('square').value = '';
		document.getElementById('square').focus();
	saveNotes();

	} else {
	// vi har klickat någon annan stans
	editor.setContents(selectedNote.content);
		myTitle2.setAttribute('value', selectedNote.title);
	
	
	
		// göm toolbar och editor när man klickar på en sparad anteckning i sidebaren
/* 		var myToolbar = document.querySelector('.ql-toolbar.ql-snow').style.display = 'none';
		var myEditor = document.querySelector('#editor').style.border = 'none'; */
}

});

// Laddar anteckningarna när sidan laddas/refreshas

window.addEventListener('load', (event) => {
	loadNotes();
	document.getElementById('square').focus();
});

function renderNotes() {
	var text = editor.getText();
	var justHtmlContent = document.querySelector('#notes ul');
	justHtmlContent.innerHTML = '';
	noteList.forEach(renderNote);
}

function renderFavNotes() {
	//var text = editor.getText();
	var justHtmlContent = document.querySelector('#notes ul');
	justHtmlContent.innerHTML = '';
	let favNotes = [];
	// for loop på noteList. pusha till favNotes om och endast om noteList[i].favourite ===
	favNotes.forEach(renderNote);
}

function getTitle () {
const theItem = document.forms['enter'];
	var myTitle = theItem.querySelector('input[type="text"]').value;
/* 	
	if (myTitle == '' || myTitle.length == 0) {
		return false;

	} else { */
		return myTitle;
	};


// Skapar en preview av anteckingen och lägger till den i DOMen


function renderNote(note) {
	let title;
	let titleLength = 25;
	let favClass = '';
	if (note.preview.length > titleLength) {
		title = note.preview.substring(0, titleLength) + '...';
	} else {
		title = note.preview.substring(0, titleLength);
	}
	//console.log(note.id + ': ' + note.favourite);
	if (note.favourite) {
		favClass = 'favFilled';
	} else {
		favClass = '';
	}

	document.querySelector('#notes ul').innerHTML += `<li id='${note.id}'><h6>${note.title}</h6><p class="title">${title}</p><br><p class="created">${note.created}</p>
	<div class="icons"><button class="trash"><i class="far fa-trash-alt"></i></button><button class="favourite fav hoverFav ${favClass}"></button></div></li>`;

	
}

// Sparar anteckningarna i local storage

function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(noteList));
}

// Hämtar anteckningarna från local storage

function loadNotes() {
	noteList = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
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
//vid klick på "+" sparas aktuell note ned, renderas och editor töms.
//todo: spara+rendera inte igen om redan sparad. detta gäller eg. addNote i stort.

function newNote() {
	addNote();
	editor.setText('');
	document.getElementById('square').value = '';
}

//Något Kristian började med
/*   selectedNote.contents = editor.getContents();
  selectedNote.preview = editor.getText(0, 12); */

//Kanske något sånt här?
/*   if (localStorage.getItem(selectedNote) === null) {
      addNote()
    } */

//Är denna raden användbar?
//selectedNote = noteList.find((note) => note.id === Number(clickedID));

function addNote() {

	let note = {
		id: Date.now(),
		created: showDate(),
		content: editor.getContents(),
		preview: editor.getText(0, 25),
		title: getTitle()
	};

	noteList.push(note);
	console.log(noteList);

	saveNotes();
	renderNotes();

}

//Ändra mall i editor

function changeCSS(cssFile, cssLinkIndex) {

	var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

	var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");
	newlink.setAttribute("href", cssFile);

	document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

/* function themeOne() {
	var theme = document.querySelector('.themes');
	theme.href = "style1.css";
}

function themeTwo() {
	var theme = document.querySelector('.themes');
	theme.href = "style2.css";
}

function themeThree() {
	var theme = document.querySelector('.themes');
	theme.href = "style3.css";
}
 */



//Innehåll i theme-picker
const themePickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-themes .ql-picker-item'));

themePickerItems.forEach((cssFile, cssLinkIndex) => {
var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
  var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");
	
	newlink.setAttribute("href", cssFile);
	document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
});





function openNav() {
	document.getElementById("mySidenav").style.width = "500px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}







/* function changeCSS(cssFile, cssLinkIndex) {

	var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

	var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");
	newlink.setAttribute("href", cssFile);

	document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
} */



