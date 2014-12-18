
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg == "retJson received") {
            port.disconnect();
        }
        else if (msg.X && msg.Y) {
            posX = msg.X;
            posY = msg.Y;
        }
        else if (msg.text) {
            $.ajax({
                url: "http://fanyi.youdao.com/openapi.do?keyfrom=capric0rn&key=1610565582&type=data&doctype=json&version=1.1&q=" + msg.text,
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function(retJson) {
                    if (retJson.basic) {
                        port.postMessage({retJson: retJson.basic.explains});
                    }
                    else {
                        port.postMessage({retJson: retJson.translation});
                    }
                }
            })
        }
    })
});
