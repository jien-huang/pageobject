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
                alert('Capture Page failed, please reload this page and re-try.')
            }
            else {
                // inject.js take care of everything
                // it only return a number of how many pages have been captured
                // here, just pass on to the popup side
                chrome.browserAction.setBadgeText({ text: response.content });
            }
        });
    });
}
