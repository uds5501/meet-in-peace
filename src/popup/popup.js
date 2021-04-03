// Checkboxes
let mainButton = document.getElementById('mainButton');

let gmeet_messages = document.getElementById('gmeet_messages');
let gmeet_participants = document.getElementById('gmeet_participants');
let gmeet_video = document.getElementById('gmeet_video');
let gmeet_entry = document.getElementById('gmeet_entry');

let zoom_messages = document.getElementById('zoom_messages');
let zoom_participants = document.getElementById('zoom_participants');
let zoom_video = document.getElementById('zoom_video');
let zoom_entry = document.getElementById('zoom_entry');

let slack_messages = document.getElementById('slack_messages');
let slack_sidebar = document.getElementById('slack_sidebar');
let slack_members = document.getElementById('slack_members');
let slack_workspace = document.getElementById('slack_workspace');
let slack_userProfile = document.getElementById('slack_userProfile');

let general_messages = document.getElementById('general_messages');


// Get and set current version
let version = chrome.runtime.getManifest().version;
document.getElementById('version').innerText = version;

// Add or remove stylesheets
function refreshScript(url, file){
  console.log("Trying to refresh...")
  chrome.tabs.query({url}, function(tabs) {
    if (tabs.length !== 0)
      tabs.forEach(function(tab){chrome.tabs.executeScript(tab.id, {file})});
  });
}

const buttonNames = [
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
];
const gmeet_url = "https://meet.google.com/*";
const loadMeet_url = "/loadMeet.js";

const zoom_url = "https://*.zoom.us/*";
const loadZoom_url = "/loadZoom.js";

const slack_url = "https://app.slack.com/*";
const loadSlack_url = "/loadSlack.js";

const refreshMeet = () => {
  refreshScript(gmeet_url, loadMeet_url);
}

const refreshZoom = () => {
  refreshScript(zoom_url, loadZoom_url);
}

const refreshSlack = () => {
  refreshScript(slack_url, loadSlack_url);
}

// Set current state in popup
chrome.storage.sync.get(buttonNames, function(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      mainButton.checked=data.mainButton;
      
      gmeet_messages.checked=data.gmeet_messages;
      gmeet_participants.checked=data.gmeet_participants;
      gmeet_video.checked=data.gmeet_video;
      gmeet_entry.checked=data.gmeet_entry;
      gmeet_badge.checked=data.gmeet_badge;
      
      zoom_messages.checked=data.zoom_messages;
      zoom_participants.checked=data.zoom_participants;
      zoom_video.checked=data.zoom_video;
      // zoom_entry.checked=data.zoom_entry;
      
      slack_messages.checked = data.slack_messages;
      slack_members.checked = data.slack_members;
      slack_sidebar.checked = data.slack_sidebar;
      slack_workspace.checked = data.slack_workspace;
      slack_userProfile.checked = data.slack_userProfile;

      general_messages.checked=data.general_messages;
    });
});

mainButton.addEventListener('change', function() {
  console.log("We changing?");
  chrome.storage.sync.set({mainButton: this.checked});
  refreshMeet();
  refreshZoom();
});
// Update settings values
gmeet_messages.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_messages: this.checked});
  refreshMeet();
});
gmeet_participants.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_participants: this.checked});
  refreshMeet();
});
gmeet_entry.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_entry: this.checked});
  refreshMeet();
});
gmeet_badge.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_badge: this.checked});
  refreshMeet();
});
gmeet_video.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_video: this.checked});
  refreshMeet();
});

zoom_messages.addEventListener('change', function() {
  chrome.storage.sync.set({zoom_messages: this.checked});
  refreshZoom();
});
zoom_participants.addEventListener('change', function() {
  chrome.storage.sync.set({zoom_participants: this.checked});
  refreshZoom();
});
zoom_video.addEventListener('change', function() {
  chrome.storage.sync.set({zoom_video: this.checked});
  refreshZoom();
});
// zoom_entry.addEventListener('change', function() {
//   chrome.storage.sync.set({zoom_entry: this.checked});
//   refreshZoom();
// });

slack_messages.addEventListener('change', function(){
  chrome.storage.sync.set({slack_messages: this.checked});
  refreshSlack();
});
slack_members.addEventListener('change', function(){
  chrome.storage.sync.set({slack_members: this.checked});
  refreshSlack();
});
slack_sidebar.addEventListener('change', function(){
  chrome.storage.sync.set({slack_sidebar: this.checked});
  refreshSlack();
});
slack_workspace.addEventListener('change', function(){
  chrome.storage.sync.set({slack_workspace: this.checked});
  refreshSlack();
});
slack_userProfile.addEventListener('change', function(){
  chrome.storage.sync.set({slack_userProfile: this.checked});
  refreshSlack();
});

// Later
// general_messages.addEventListener('change', function() {
//   chrome.storage.sync.set({general_messages: this.checked});
//   refreshScript();
// });
