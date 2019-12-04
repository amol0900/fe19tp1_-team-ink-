var toolbarOptions = [
  [{ font: [] }],
  [{ size: ['small', false, 'large', 'huge'] }], 
  ['bold', 'italic', 'underline', 'strike'], 
  [{ align: [] }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],

  [{ color: [] }, { background: [] }],

  ['clean']
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
    document.getElementById('title').value = '';
    document.getElementById('title').focus();
    saveNotes();
    selectedNote = null;
  } else {
    var myTitle2 = document.getElementById('title');
    editor.setContents(selectedNote.content);
    myTitle2.value = selectedNote.title;
  }
});

window.addEventListener('load', (event) => {
  loadNotes();
  document.getElementById('title').focus();
});

function renderNotes() {
  var text = editor.getText();
  var justHtmlContent = document.querySelector('#notes ul');
  justHtmlContent.innerHTML = '';
  noteList.forEach(renderNote);
}

function renderFavNotes() {
  var fav = document
    .querySelector('#notes ul')
    .getElementsByTagName('li');

  var isNoteListEmpty = true;
  for (let index = 0; index < noteList.length; index++) {
    if (noteList[index].favourite) {
      isNoteListEmpty = false;
      break;
    }
  }
  if (!isNoteListEmpty) {
    for (let index = 0; index < fav.length; index++) {
      if (!noteList[index].favourite) {
        fav[index].classList.add('hide');
      }
    }
  }
}

function renderAllNotes() {
  var fav = document
    .querySelector('#notes ul')
    .getElementsByTagName('li');
  for (let index = 0; index < fav.length; index++) {
    fav[index].classList.remove('hide');
  }
}

var myFavListButton = document.querySelector('.favs');
myFavListButton.addEventListener('click', function (e) {
  if (e.target.classList.contains('favs')) {
    e.target.classList.toggle('favsFilled');
  }

  if (isFavouritesToggled) {
    renderAllNotes();
    isFavouritesToggled = false;
  } else {
    renderFavNotes();
    isFavouritesToggled = true;
  }
});

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

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(noteList));
}

function loadNotes() {
  noteList = localStorage.getItem('notes')
    ? JSON.parse(localStorage.getItem('notes'))
    : [];
  renderNotes();
}

function showDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : '0' + minutes;
  day = day > 9 ? day : '0' + day;
  let finalTime = `${year}-${month}-${day} at ${hours}:${minutes}`;
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

if (/Android [4-6]/.test(navigator.appVersion)) {
  window.addEventListener("resize", function () {
    if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  })
}
