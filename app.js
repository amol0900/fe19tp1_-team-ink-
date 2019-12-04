var toolbarOptions = [
  [{ font: [] }],
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ align: [] }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  ['clean'] // remove formatting button
];

var editor = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Write your notes here',
  theme: 'snow'
});

var noteList = [];
var selectedNote;

var isFavouritesToggled = false;

var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function (e) {
  let clickedLI = e.target.closest('li');
  selectedNote = noteList.find(
    (note) => note.id === Number(clickedLI.id)
  );

  if (e.target.classList.contains('fav')) {
    selectedNote.favourite = !selectedNote.favourite;
    saveNotes();

    e.target.classList.toggle('favFilled');
  } else if (e.target.classList.contains('far')) {
    noteList = noteList.filter(
      (note) => note.id !== Number(clickedLI.id)
    );

    clickedLI.remove();
    editor.setText('');
    document.getElementById('square').value = '';
    document.getElementById('square').focus();
    saveNotes();
    selectedNote = null;

    // ändra ovan så att när man tar bort en annan note än selectedNote, så töms inte editorn
  } else {
    var myTitle2 = document.getElementById('square');
    editor.setContents(selectedNote.content);
    myTitle2.value = selectedNote.title;
  }
});

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

// Gömmer notes som ej är favoriter
function renderFavNotes() {
  // Få listan till vår li
  var fav = document
    .querySelector('#notes ul')
    .getElementsByTagName('li');

  // Gå igenom notelistan, och kolla om det finns några
  // favoriter i den. Finns det det, är listan ej tom
  var isNoteListEmpty = true;
  for (let index = 0; index < noteList.length; index++) {
    // Checka om noten är en favorit
    if (noteList[index].favourite) {
      isNoteListEmpty = false;
      break;
    }
  }

  // Om listan INTE är tom på favoriter
  if (!isNoteListEmpty) {
    // Gå igenom vår ul
    for (let index = 0; index < fav.length; index++) {
      // Om nuvaranda note INTE är en favorit, vill vi gömma den
      if (!noteList[index].favourite) {
        // Lägg till klassen "hide" till <li>
        // hide ligger i style.css om det finns frågetecken
        fav[index].classList.add('hide');
      }
    }
  }
}

// Renderar all notes
function renderAllNotes() {
  // Få listan till vår li
  var fav = document
    .querySelector('#notes ul')
    .getElementsByTagName('li');

  // Gå igenom hela <ul> - listan
  for (let index = 0; index < fav.length; index++) {
    // Ta bort "hide" - klassen om den finns
    // D.v.s visa ALLA items
    fav[index].classList.remove('hide');
  }
}

var myFavListButton = document.querySelector('.favs');
myFavListButton.addEventListener('click', function (e) {
  if (e.target.classList.contains('favs')) {
    e.target.classList.toggle('favsFilled');
  }

  // Om favoriter redan är togglade
  if (isFavouritesToggled) {
    // Visa alla notes
    renderAllNotes();
    isFavouritesToggled = false;
  } else {
    // Annars toggla favoriter
    renderFavNotes();
    isFavouritesToggled = true;
  }
});

// Funktion som bestämmer om favoriter ska gömmas eller visas
/* function toggleFavNotes(e) 
} */

function getTitle() {
  const theItem = document.forms['enter'];
  var myTitle = theItem.querySelector('input[type="text"]').value;

  return myTitle;
}

function renderNote(note) {
  let preview;
  let previewLength = 23;
  let favClass = '';
  if (note.preview.length > previewLength) {
    preview = note.preview.substring(0, previewLength) + '...';
  } else {
    console.log('length not too long');
    preview = note.preview.substring(0, previewLength);
  }

  if (note.favourite) {
    favClass = 'favFilled';
  } else {
    favClass = '';
  }

  document.querySelector(
    '#notes ul'
  ).innerHTML += `<li id='${note.id}'><h6>${note.title}</h6><p class="title">${preview}</p><br><p class="created">${note.created}</p>
	<div class="icons"><button class="trash"><i class="far fa-trash-alt"></i></button><button class="favourite fav hoverFav ${favClass}"></button></div></li>`;
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
  day = day > 9 ? day : '0' + day;
  let finalTime = `${year}-${month}-${day} at ${hours}:${minutes}`;
  //bug - om "minutes" är mindre än 10 visas ex: 20:8 när det ska vara 20:08. If statement för att lösa?
  return finalTime;
}

function newNote() {
  addNote();
  selectedNote = null;
  editor.setText('');
  document.getElementById('square').value = '';
  document.getElementById('square').focus();
}

function hideTick() {
  document.querySelector('.fa-check').style.visibility = 'hidden';
}

function addNote() {

  if (selectedNote) {
    selectedNote.content = editor.getContents();
    selectedNote.preview = editor.getText(0, 50);
    selectedNote.title = getTitle();
    selectedNote.created = showDate();
    saveNotes();
    renderNotes();
  } else {
    let note = {
      id: Date.now(),
      created: showDate(),
      content: editor.getContents(),
      preview: editor.getText(0, 50),
      title: getTitle()
    };

    if (note.content.length == 0) {
      return false;
    }

    noteList.unshift(note);
    console.log(noteList);
    saveNotes();
    renderNotes();
  }
}


//Ändra mall i editor

function changeCSS(cssFile, cssLinkIndex) {
  var oldlink = document.getElementsByTagName('link').item(cssLinkIndex);

  var newlink = document.createElement('link');
  newlink.setAttribute('rel', 'stylesheet');
  newlink.setAttribute('type', 'text/css');
  newlink.setAttribute('href', cssFile);

  document
    .getElementsByTagName('head')
    .item(0)
    .replaceChild(newlink, oldlink);
}


//Innehåll i theme-picker
const themePickerItems = Array.prototype.slice.call(
  document.querySelectorAll('.ql-themes .ql-picker-item')
);

themePickerItems.forEach((cssFile, cssLinkIndex) => {
  var oldlink = document.getElementsByTagName('link').item(cssLinkIndex);
  var newlink = document.createElement('link');
  newlink.setAttribute('rel', 'stylesheet');
  newlink.setAttribute('type', 'text/css');

  newlink.setAttribute('href', cssFile);
  document
    .getElementsByTagName('head')
    .item(0)
    .replaceChild(newlink, oldlink);
});

//Sidenav

function openNav() {
  document
    .getElementById('mySidenav')
    .classList.replace('hiddenSidenav', 'sidenav');
  document.querySelector('.favs').style.visibility = 'visible';
  document.querySelector('.favs').style.opacity = '100%';
}

function closeNav() {
  document
    .getElementById('mySidenav')
    .classList.replace('sidenav', 'hiddenSidenav');
  document.querySelector('.favs').style.visibility = 'hidden';
  document.querySelector('.favs').style.opacity = '0%';
}

