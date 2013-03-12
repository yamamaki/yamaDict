$(document).ready(function() {
	var message = chrome.extension.getBackgroundPage().message;
	lookUp(message);
});

function lookUp(word) {
	url = "http://www.iciba.com/"+word+" #dict_content_1";
	$("#result").load(url);
	$("#header").html("<h4>"+word+"<h4>");
}
