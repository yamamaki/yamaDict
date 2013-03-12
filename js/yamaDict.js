$(document).ready(function() {
	$(document).mouseup(function() {
		word = window.getSelection();
		if (word != null && jQuery.trim(word) != "") {
			word = jQuery.trim(word);
			chrome.extension.sendMessage({message:word}, function(response) {
				console.log(response);
			})
		}
	});
});

