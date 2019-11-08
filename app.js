var options = {
	placeholder: 'Write',
	theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
var preciousContent = document.getElementById('deltaContent');
var justHtmlContent = document.getElementById('notes');

editor.on('text-change', function() {
	var delta = editor.getContents();
	var justHtml = editor.root.innerHTML;
	preciousContent.innerHTML = JSON.stringify(delta);
	justHtmlContent.innerHTML = justHtml;
});

console.log(editor);

/* function addNote() {
	let note = {
		id: Date.now(),
		content: editor.getContents(),
		favourite: false,
		deleted: false,
		modified: Date.now()
	};
}
 */
