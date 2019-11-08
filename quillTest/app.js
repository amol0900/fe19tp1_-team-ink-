/* //Quill
var toolbarOptions = [['bold', 'italic'], ['link', 'image']];

var quill = new Quill('#quillEditor', {
    theme: 'snow'
});

//end Quill */

var options = {
    placeholder: 'Waiting for your precious content',
    theme: 'snow'
};

var editor = new Quill('#quillEditor', options);
var preciousContent = document.getElementById('myPrecious');
var justTextContent = document.getElementById('justText');
var justHtmlContent = document.getElementById('justHtml');

editor.on('text-change', function () {
    var delta = editor.getContents();
    var text = editor.getText();
    var justHtml = editor.root.innerHTML;
    preciousContent.innerHTML = JSON.stringify(delta);
    justTextContent.innerHTML = text;
    justHtmlContent.innerHTML = justHtml;
});

// Further Reading:
//https://quilljs.com/guides/working-with-deltas/
//https://github.com/quilljs/quill/issues/774