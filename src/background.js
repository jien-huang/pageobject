chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: "Capture This Page",
    contexts: ["page"],
    onclick: function () {
        sendMessageToContentScript({ type: 'get' });
    }
});

function sendMessageToContentScript(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (!response) {
                alert('We got nothing from your browser, please check.')
            }
            else {
                chrome.browserAction.setBadgeText({ text: response.content });
            }
        });
    });
}
