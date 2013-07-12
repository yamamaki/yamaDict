$(document).ready(function() {
	var message = chrome.extension.getBackgroundPage().message;
	lookUp(message);
});

function lookUp(word) {
	url = "http://www.iciba.com/"+word;
	$("#header").html("<h4>"+word+"<h4>");
	$("#result").load(url+'. group_pos');
}
