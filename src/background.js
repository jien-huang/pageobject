chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: "Capture This Page",
    contexts: ["page"],
    onclick: function(){alert('you click context menu');}
});