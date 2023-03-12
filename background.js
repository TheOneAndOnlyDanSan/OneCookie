chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	chrome.tabs.remove(sender.tab.id);
});