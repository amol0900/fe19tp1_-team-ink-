var toolbarOptions = [
	[ 'bold', 'italic', 'underline', 'strike' ],
	[ { header: 1 }, { header: 2 } ],
	[ { list: 'ordered' }, { list: 'bullet' } ]
];

var quill = new Quill('#editor', {
	modules: {
		toolbar: toolbarOptions
	},

	theme: 'snow'
});
