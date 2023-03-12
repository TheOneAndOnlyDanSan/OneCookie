var injectedScripts = [
	"fixClose"
];

injectedScripts.forEach(function (script) {
	var s = document.createElement("script");
	s.src = chrome.runtime.getURL("js/inject/" + script + ".js");
	s.async = false;
	s.onload = function () {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
});

var time = new Date().getTime();
chrome.storage.sync.set({active: time});

var close = false;

chrome.storage.onChanged.addListener(function(changes, areaName) {
	if(areaName != "sync" || changes.active == null) return;
	
	if((changes.active.newValue - time) <= 2000) {
		(async function() {
			await chrome.storage.sync.set({active: time});
		})();
	}
	
	if(close) {
		window.dispatchEvent(new CustomEvent("closeWarn"));
		chrome.runtime.sendMessage({});
	} else if(!close) {
		close = true;
	}
});
