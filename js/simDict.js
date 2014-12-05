
$(document).ready(function () {
//    $("head").append("<link>");
//    css = $("head").children(":last");
//    css.attr({
//        rel: "stylesheet",
//        type: "text/css",
//        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
//    });
    $(document).mouseup(function (e) {
        var tag = e.target.tagName.toLowerCase();
        var item = fetchText();
        if (item) {
            var ele = $(e.target);
            var tmp = ele.html().split(item);
            var port = chrome.runtime.connect();
            port.postMessage("connection request");
            port.onMessage.addListener(function (msg) {
                if (msg == "connection established") {
                    port.postMessage(item);
                }
                else {
                    var content = tmp[0];
                    for (var i=1; i<tmp.length; ++i) {
                        var ret = JSON.stringify(msg).replace(/\"/g,"'");
                        content += "<a href=# title=\""+ret+"\">"+item+"</a>"+tmp[i]
                    }
                    ele.html(content);
                    port.postMessage("result received");
                }
            });
        }
    });
});

function fetchText() {
    var text;
    if (document.selection) {
        text = document.selection.createRange().text;
    }
    else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    else if (document.getSelection) {
        text = document.getSelection().toString();
    }
    return text;
}


