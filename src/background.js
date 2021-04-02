chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.get([
        'mainButton',
        'gmeet_messages',
        'gmeet_participants',
        'gmeet_video',
        'gmeet_entry',
        'zoom_messages',
        'zoom_participants',
        'zoom_video',
        'zoom_entry',
        'general_messages',
        'gmeet_badge',
    ], function (data) {
        data.mainButton == null && chrome.storage.sync.set({ mainButton: true });
        data.gmeet_messages == null && chrome.storage.sync.set({ gmeet_messages: true });
        data.gmeet_participants == null && chrome.storage.sync.set({ gmeet_participants: true });
        data.gmeet_video == null && chrome.storage.sync.set({ gmeet_video: false });
        data.gmeet_entry == null && chrome.storage.sync.set({ gmeet_entry: false });
        data.zoom_messages == null && chrome.storage.sync.set({ zoom_messages: true });
        data.zoom_video == null && chrome.storage.sync.set({ zoom_video: false });
        data.zoom_entry == null && chrome.storage.sync.set({ zoom_entry: false });
        data.general_messages == null && chrome.storage.sync.set({ general_messages: false });
        data.gmeet_badge == null && chrome.storage.sync.set({ gmeet_badge: false });
    });
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == 'toggle') {
        chrome.storage.sync.get(['mainButton'], function (data) {
            console.log("Setting the main button element to: ", !data.mainButton);
            chrome.storage.sync.set({ mainButton: !data.mainButton });
            chrome.tabs.query({ url: "https://meet.google.com/*" }, function (tabs) {
                if (tabs.length !== 0)
                    tabs.forEach(function (tab) { chrome.tabs.executeScript(tab.id, { file: '/loadMeet.js' }) });
            });
            // add others here too
        });
    }
});