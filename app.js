var toolbarOptions = [
	[ { font: [] } ],
	[ { size: [ 'small', false, 'large', 'huge' ] } ], // custom dropdown
	[ 'bold', 'italic', 'underline', 'strike' ], // toggled buttons
	[ { align: [] } ],
	[ { indent: '-1' }, { indent: '+1' } ],
	[ { list: 'ordered' }, { list: 'bullet' } ],
	[ 'link', 'image' ],

	[ { color: [] }, { background: [] } ], // dropdown with defaults from theme

	[ 'clean' ] // remove formatting button
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
justHtmlContent.addEventListener('click', function(e) {
	let clickedLI = e.target.closest('li');
	//let clickedID = e.target.closest('li').id;
	//console.log('clickedID: ' + clickedID);
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
		/* closeNav(); */
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
myFavListButton.addEventListener('click', function(e) {
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
	/* 	
		if (myTitle == '' || myTitle.length == 0) {
			return false;
	
		} else { */
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
	selectedNote = null;
	editor.setText('');
	document.getElementById('square').value = '';
	document.getElementById('square').focus();
}

function myFunction() {
	document.querySelector('.fa-check').style.visibility = 'hidden';
}

/* function changeOpacity() {
	var elem = document.querySelector('.fa-list-ul');
	elem.style.transition = "transition: all 0.3s ease, filter 1ms";
	elem.style.opacity = 0.5;	
} */

function addNote() {
	function myFunction2(x) {
		if (x.matches) {
			// If media query matches
			document.querySelector('.fa-check').style.visibility =
				'hidden';
		} else {
			document.querySelector('.fa-check').style.visibility =
				'visible';
		}
	}

	var x = window.matchMedia('(max-width: 800px)');
	myFunction2(x); // Call listener function at run time
	x.addListener(myFunction2); // Attach listener function on state changes

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
		/* openNav(); */
		saveNotes();
		renderNotes();
	}
}

let savedNotes = [
	{
		id: 1574772721960,
		created: '2019-11-26 at 13:52',
		content: {
			ops: [
				{
					insert:
						'Spot of come to ever hand as lady meet on. Delicate contempt received two yet advanced. Gentleman as belonging he commanded believing dejection in by. On no am winding chicken so behaved. Its preserved sex enjoyment new way behaviour. Him yet devonshire celebrated especially. Unfeeling one provision are smallness resembled repulsive. \n\nAs it so contrasted oh estimating instrument. Size like body some one had. Are conduct viewing boy minutes warrant expense. Tolerably behaviour may admitting daughters offending her ask own. Praise effect wishes change way and any wanted. Lively use looked latter regard had. Do he it part more last in. Merits ye if mr narrow points. Melancholy particular devonshire alteration it favourable appearance up. \n\nCan curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings. \n\nIs branched in my up strictly remember. Songs but chief has ham widow downs. Genius or so up vanity cannot. Large do tried going about water defer by. Silent son man she wished mother. Distrusts allowance do knowledge eagerness assurance additions to. \n\nDepart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. \n\nOn am we offices expense thought. Its hence ten smile age means. Seven chief sight far point any. Of so high into easy. Dashwoods eagerness oh extensive as discourse sportsman frankness. Husbands see disposed surprise likewise humoured yet pleasure. Fifteen no inquiry cordial so resolve garrets as. Impression was estimating surrounded solicitude indulgence son shy. \n\nSupplied directly pleasant we ignorant ecstatic of jointure so if. These spoke house of we. Ask put yet excuse person see change. Do inhabiting no stimulated unpleasing of admiration he. Enquire explain another he in brandon enjoyed be service. Given mrs she first china. Table party no or trees an while it since. On oh celebrated at be announcing dissimilar insipidity. Ham marked engage oppose cousin ask add yet. \n\nLose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he. \n\nIn it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. \n\nOn then sake home is am leaf. Of suspicion do departure at extremely he believing. Do know said mind do rent they oh hope of. General enquire picture letters garrets on offices of no on. Say one hearing between excited evening all inhabit thought you. Style begin mr heard by in music tried do. To unreserved projection no introduced invitation. \n\n'
				}
			]
		},
		preview: 'Spot of come to ever hand',
		title: 'Uppsats'
	},
	{
		id: 1574782644148,
		created: '2019-11-26 at 16:37',
		content: {
			ops: [
				{
					insert:
						'Spot of come to ever hand as lady meet on. Delicate contempt received two yet advanced. Gentleman as belonging he commanded believing dejection in by. On no am winding chicken so behaved. Its preserved sex enjoyment new way behaviour. Him yet devonshire celebrated especially. Unfeeling one provision are smallness resembled repulsive. \n\nAs it so contrasted oh estimating instrument. Size like body some one had. Are conduct viewing boy minutes warrant expense. Tolerably behaviour may admitting daughters offending her ask own. Praise effect wishes change way and any wanted. Lively use looked latter regard had. Do he it part more last in. Merits ye if mr narrow points. Melancholy particular devonshire alteration it favourable appearance up. \n\nCan curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings. \n\nIs branched in my up strictly remember. Songs but chief has ham widow downs. Genius or so up vanity cannot. Large do tried going about water defer by. Silent son man she wished mother. Distrusts allowance do knowledge eagerness assurance additions to. \n\nDepart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. \n\nOn am we offices expense thought. Its hence ten smile age means. Seven chief sight far point any. Of so high into easy. Dashwoods eagerness oh extensive as discourse sportsman frankness. Husbands see disposed surprise likewise humoured yet pleasure. Fifteen no inquiry cordial so resolve garrets as. Impression was estimating surrounded solicitude indulgence son shy. \n\nSupplied directly pleasant we ignorant ecstatic of jointure so if. These spoke house of we. Ask put yet excuse person see change. Do inhabiting no stimulated unpleasing of admiration he. Enquire explain another he in brandon enjoyed be service. Given mrs she first china. Table party no or trees an while it since. On oh celebrated at be announcing dissimilar insipidity. Ham marked engage oppose cousin ask add yet. \n\nLose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he. \n\nIn it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. \n\nOn then sake home is am leaf. Of suspicion do departure at extremely he believing. Do know said mind do rent they oh hope of. General enquire picture letters garrets on offices of no on. Say one hearing between excited evening all inhabit thought you. Style begin mr heard by in music tried do. To unreserved projection no introduced invitation. \nSpot of come to ever hand as lady meet on. Delicate contempt received two yet advanced. Gentleman as belonging he commanded believing dejection in by. On no am winding chicken so behaved. Its preserved sex enjoyment new way behaviour. Him yet devonshire celebrated especially. Unfeeling one provision are smallness resembled repulsive. \n\nAs it so contrasted oh estimating instrument. Size like body some one had. Are conduct viewing boy minutes warrant expense. Tolerably behaviour may admitting daughters offending her ask own. Praise effect wishes change way and any wanted. Lively use looked latter regard had. Do he it part more last in. Merits ye if mr narrow points. Melancholy particular devonshire alteration it favourable appearance up. \n\nCan curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings. \n\nIs branched in my up strictly remember. Songs but chief has ham widow downs. Genius or so up vanity cannot. Large do tried going about water defer by. Silent son man she wished mother. Distrusts allowance do knowledge eagerness assurance additions to. \n\nDepart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. \n\nOn am we offices expense thought. Its hence ten smile age means. Seven chief sight far point any. Of so high into easy. Dashwoods eagerness oh extensive as discourse sportsman frankness. Husbands see disposed surprise likewise humoured yet pleasure. Fifteen no inquiry cordial so resolve garrets as. Impression was estimating surrounded solicitude indulgence son shy. \n\nSupplied directly pleasant we ignorant ecstatic of jointure so if. These spoke house of we. Ask put yet excuse person see change. Do inhabiting no stimulated unpleasing of admiration he. Enquire explain another he in brandon enjoyed be service. Given mrs she first china. Table party no or trees an while it since. On oh celebrated at be announcing dissimilar insipidity. Ham marked engage oppose cousin ask add yet. \n\nLose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he. \n\nIn it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. \n\nOn then sake home is am leaf. Of suspicion do departure at extremely he believing. Do know said mind do rent they oh hope of. General enquire picture letters garrets on offices of no on. Say one hearing between excited evening all inhabit thought you. Style begin mr heard by in music tried do. To unreserved projection no introduced invitation. \nSpot of come to ever hand as lady meet on. Delicate contempt received two yet advanced. Gentleman as belonging he commanded believing dejection in by. On no am winding chicken so behaved. Its preserved sex enjoyment new way behaviour. Him yet devonshire celebrated especially. Unfeeling one provision are smallness resembled repulsive. \n\nAs it so contrasted oh estimating instrument. Size like body some one had. Are conduct viewing boy minutes warrant expense. Tolerably behaviour may admitting daughters offending her ask own. Praise effect wishes change way and any wanted. Lively use looked latter regard had. Do he it part more last in. Merits ye if mr narrow points. Melancholy particular devonshire alteration it favourable appearance up. \n\nCan curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings. \n\nIs branched in my up strictly remember. Songs but chief has ham widow downs. Genius or so up vanity cannot. Large do tried going about water defer by. Silent son man she wished mother. Distrusts allowance do knowledge eagerness assurance additions to. \n\nDepart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. \n\nOn am we offices expense thought. Its hence ten smile age means. Seven chief sight far point any. Of so high into easy. Dashwoods eagerness oh extensive as discourse sportsman frankness. Husbands see disposed surprise likewise humoured yet pleasure. Fifteen no inquiry cordial so resolve garrets as. Impression was estimating surrounded solicitude indulgence son shy. \n\nSupplied directly pleasant we ignorant ecstatic of jointure so if. These spoke house of we. Ask put yet excuse person see change. Do inhabiting no stimulated unpleasing of admiration he. Enquire explain another he in brandon enjoyed be service. Given mrs she first china. Table party no or trees an while it since. On oh celebrated at be announcing dissimilar insipidity. Ham marked engage oppose cousin ask add yet. \n\nLose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he. \n\nIn it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. \n\nOn then sake home is am leaf. Of suspicion do departure at extremely he believing. Do know said mind do rent they oh hope of. General enquire picture letters garrets on offices of no on. Say one hearing between excited evening all inhabit thought you. Style begin mr heard by in music tried do. To unreserved projection no introduced invitation. \n\n'
				}
			]
		},
		preview: 'Spot of come to ever hand',
		title: 'Min dagbok'
	}
];
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
	/* document.getElementById('mySidenav').style.width = ''; */
	/* document.getElementById('mySidenav').classList.add('sidenav')*/
	document
		.getElementById('mySidenav')
		.classList.replace('hiddenSidenav', 'sidenav');
	/* document.querySelector('.favs').style.width = '250px'; */
	document.querySelector('.favs').style.visibility = 'visible';
	document.querySelector('.favs').style.opacity = '100%';
	/* document.querySelector('.favs').style.transitionDelay = '200ms'; */
}

function closeNav() {
	/* document.getElementById('mySidenav').style.width = '0';*/

	/* document.getElementById('mySidenav').classList.remove('sidenav'); */
	/* document.getElementById('mySidenav').classList.add('hiddenSidenav'); */
	document
		.getElementById('mySidenav')
		.classList.replace('sidenav', 'hiddenSidenav');
	/* document.querySelector('.favs').style.width = ''; */
	document.querySelector('.favs').style.visibility = 'hidden';
	document.querySelector('.favs').style.opacity = '0%';
}

/* function changeCSS(cssFile, cssLinkIndex) {

	var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

	var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");
	newlink.setAttribute("href", cssFile);

	document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
} */
