
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg == "connection request") {
            port.postMessage("connection established");
        }
        else if (msg == "result received") {
            port.disconnect();
        }
        else {
            $.ajax({
                url: "http://fanyi.youdao.com/openapi.do?keyfrom=capric0rn&key=1610565582&type=data&doctype=json&version=1.1&q=" + msg,
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function(retJson) {
                    if (retJson.basic) {
                        port.postMessage(retJson.basic.explains);
                    }
                    else {
                        port.postMessage(retJson.translation);
                    }
                }
            })
        }
    })
});
