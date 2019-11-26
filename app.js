toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline'],
  ['link', 'image'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['clean']
]


Quill.register('modules/counter', function (quill, options) {
  var container = document.querySelector('#counter');
  quill.on('text-change', function () {
    var text = quill.getText();
    // There are a couple issues with counting words
    // this way but we'll fix these later
    container.innerHTML = text.trim().length;
  });
});


var editor = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
    counter: true
  },

  placeholder: 'Write your notes here',
  theme: 'snow',
});


var noteList = [];
var selectedNote;

/* 
class Counter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on('text-change', this.update.bind(this));
    this.update();  // Account for initial contents
  }

  calculate() {
    let text = this.quill.getText();
    if (this.options.unit === 'characters') {
      text = text.trim();
      // Splitting empty text returns a non-empty array
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    var length = this.calculate();
    var label = this.options.unit;
    if (length !== 1) {
      label += 's';
    }
    this.container.innerText = length + ' ' + label;
  }
}
 */

//Quill.register('modules/counter', Counter);



// Laddar in anteckingen man klickar på i previewlistan till editorn

var justHtmlContent = document.querySelector('#notes ul');
justHtmlContent.addEventListener('click', function (e) {
  let clickedLI = e.target.closest('li');
  //let clickedID = e.target.closest('li').id;
  console.log('clickedID: ' + clickedLI);
  selectedNote = noteList.find((note) => note.id === Number(clickedLI.id));

  /* 	function gfg_Run() {
      inputF.setAttribute('value', 'defaultValue');
      el_down.innerHTML =
        "Value = " + "'" + inputF.value + "'";
    } 
  
    document.getElementById("id1");  */

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
    //myTitle.value = "Hej";

  }

  if (e.target.classList.contains('far')) {
    noteList = noteList.filter(note => note.id !== Number(clickedLI.id));

    clickedLI.remove();
    editor.setText('');
    document.getElementById('square').value = '';
    document.getElementById('square').focus();
    saveNotes();

  } else {
    // vi har klickat någon annan stans
    editor.setContents(selectedNote.content);

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

function getTitle() {
  //const theItem = document.forms['enter'];
  var myTitle = document.querySelector('#square').value;
  /* 	
    if (myTitle == '' || myTitle.length == 0) {
      return false;
  
    } else { */
  return myTitle;
};


// Skapar en preview av anteckingen och lägger till den i DOMen


function renderNote(note) {
  let title;
  let titleLength = 50;
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
    preview: editor.getText(0, 50),
    title: getTitle()
  };

  noteList.push(note);
  console.log(noteList);

  saveNotes();
  renderNotes();
}





// We can now access calculate() directly
// console.log(counter.calculate(), 'character')

// var quill = new Quill('#editor', {
//   modules: {
//     counter: {
//       container: '#counter',
//       unit: 'character'
//     }
//   }
// });


