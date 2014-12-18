var posX = -1, posY = -1;

function divShow(e, cls, ret, dir) {
    divHide(cls);
    $('<div class=\"'+cls+'\"></div>').appendTo('body');
    $('div.'+cls).html(ret);
    setCSS(cls);
    setPos(e, cls, dir);
}

function setPos(e, cls, dir) {
    var X = -1, Y = -1;
    switch (dir) {
        case "top":
            X = e.pageX - 4;
            Y = e.pageY - 4;
            break;
        case "bottom":
            X = e.pageX + 4;
            Y = e.pageY + 4;
            break;
    }
    $('div.'+cls).css({left: X, top: Y});
}

function divHide(cls) {
    $('div.'+cls).remove();
}

function setCSS(cls) {
    $('div.'+cls).css({
        "background-color": "#666",
        "color": "white",
        "margin": "8px",
        "padding": "8px",
        "z-index": "100",
        "position": "absolute",
        "opacity": "2",
        "border-radius": "8px"
    })
}

function fetchText() {
    var text, parentNode;
    if (document.selection) {
        parentNode = document.selection.createRange().parentElement();
        text = document.selection.createRange().text;
    }
    else if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            parentNode = selection.getRangeAt(0).startContainer.parentNode;
        }
        text = window.getSelection().toString();
    }
    return text;
}

$(document).ready(function () {
    $(document).mouseup(function (e) {
        var retJson, text;
        text = fetchText();
        if (text) {
            var port = chrome.runtime.connect();
            port.postMessage({"text": text});
            port.onMessage.addListener(function (msg) {
                if (msg.retJson) {
                    retJson = msg.retJson;
                    port.postMessage("retJson received");
                }
            });
            $(e.target).hover(function() {
                if (text === fetchText() && retJson) {
                    divShow(e, "sd-tooltips", JSON.stringify(retJson).replace(/"/g, "'"), "bottom");
                }
            }, function() {
                divHide("sd-tooltips");
            });
        }
    });
});