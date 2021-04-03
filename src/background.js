const gmeet_url = "https://meet.google.com/*";
const loadMeet_url = "/loadMeet.js";

const zoom_url = "https://*.zoom.us/*";
const loadZoom_url = "/loadZoom.js";

const slack_url = "https://app.slack.com/*";
const loadSlack_url = "/loadSlack.js";

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.get([
        'mainButton',
        'gmeet_messages',
        'gmeet_participants',
        'gmeet_video',
        'gmeet_entry',
        'gmeet_badge',
        'zoom_messages',
        'zoom_participants',
        'zoom_video',
        // 'zoom_entry',
        'general_messages',
        'slack_messages',
        'slack_sidebar',
        'slack_members',
        'slack_workspace',
        'slack_userProfile'
    ], function (data) {
        data.mainButton == null && chrome.storage.sync.set({ mainButton: true });
        
        data.gmeet_messages == null && chrome.storage.sync.set({ gmeet_messages: true });
        data.gmeet_participants == null && chrome.storage.sync.set({ gmeet_participants: true });
        data.gmeet_video == null && chrome.storage.sync.set({ gmeet_video: false });
        data.gmeet_entry == null && chrome.storage.sync.set({ gmeet_entry: false });
        data.gmeet_badge == null && chrome.storage.sync.set({ gmeet_badge: false });
        
        data.zoom_messages == null && chrome.storage.sync.set({ zoom_messages: true });
        data.zoom_video == null && chrome.storage.sync.set({ zoom_video: false });
        // data.zoom_entry == null && chrome.storage.sync.set({ zoom_entry: false });

        data.slack_messages == null && chrome.storage.sync.set({ slack_messages: true });
        data.slack_members == null && chrome.storage.sync.set({ slack_messages: true });
        data.slack_sidebar == null && chrome.storage.sync.set({ slack_sidebar: false });
        data.slack_workspace == null && chrome.storage.sync.set({ slack_workspace: false });
        data.slack_userProfile == null && chrome.storage.sync.set({ slack_userProfile: false });

        data.general_messages == null && chrome.storage.sync.set({ general_messages: false });
    });
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == 'toggle') {
        chrome.storage.sync.get(['mainButton'], function (data) {
            console.log("Setting the main button element to: ", !data.mainButton);
            chrome.storage.sync.set({ mainButton: !data.mainButton });
            chrome.tabs.query({ url: gmeet_url }, function (tabs) {
                if (tabs.length !== 0)
                    tabs.forEach(function (tab) { chrome.tabs.executeScript(tab.id, { file: loadMeet_url }) });
            });
            chrome.tabs.query({ url: zoom_url }, function (tabs) {
                if (tabs.length !== 0)
                    tabs.forEach(function (tab) { chrome.tabs.executeScript(tab.id, { file: loadZoom_url }) });
            });
            chrome.tabs.query({ url: slack_url }, function (tabs) {
                if (tabs.length !== 0)
                    tabs.forEach(function (tab) { chrome.tabs.executeScript(tab.id, { file: loadSlack_url }) });
            });
            // add others here too
        });
    }
});