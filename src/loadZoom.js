chrome.storage.sync.get([
    'mainButton',
    'zoom_messages',
    'zoom_participants',
    'zoom_video',
    // 'zoom_entry',
    'zoom_badge'
], function (data) {
    const { 
        mainButton,
        zoom_messages,
        zoom_participants,
        zoom_video,
        // zoom_entry,
        zoom_badge
    } = data;
    function removeStyleById(id) {
        console.log(`removing style: ${id}`)
        // check if the stylesheet is there before removing
        if (el = document.getElementById(id)) {
            el.parentNode.removeChild(el);
        }
    }

    function addStyle(id) {
        console.log(`add style for ${id}`)
        // only add stylesheets if they weren't added yet
        if (!document.getElementById(id)) {
            var link = document.createElement('link');
            link.id = id;
            link.className = 'mip';
            link.href = chrome.extension.getURL('css/' + id + '.css');
            link.type = "text/css";
            link.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    }

    if (mainButton) {
        // add stylesheets if selected otherwise remove it
        if (zoom_messages) addStyle('zoom_messages'); else removeStyleById('zoom_messages');
        if (zoom_participants) addStyle('zoom_participants'); else removeStyleById('zoom_participants');
        if (zoom_video) addStyle('zoom_video'); else removeStyleById('zoom_video');
        // if (zoom_entry) addStyle('zoom_entry'); else removeStyleById('zoom_entry');
        if (zoom_badge) addStyle('zoom_badge'); else removeStyleById('zoom_badge');
    } else if (document.getElementsByClassName('mip').length > 0) {
        // remove all stylesheets
        var el = document.getElementsByClassName('mip');
        while (el.length > 0) {
            el[0].parentNode.removeChild(el[0]);
        }
    }
});
