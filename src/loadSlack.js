chrome.storage.sync.get([
    'mainButton',
    'slack_messages',
    'slack_sidebar',
    'slack_members',
    'slack_workspace',
    'slack_userProfile'
], function (data) {
    const { 
        mainButton,
        slack_messages,
        slack_sidebar,
        slack_members,
        slack_workspace,
        slack_userProfile
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
        if (slack_messages) addStyle('slack_messages'); else removeStyleById('slack_messages');
        if (slack_members) addStyle('slack_members'); else removeStyleById('slack_members');
        if (slack_sidebar) addStyle('slack_sidebar'); else removeStyleById('slack_sidebar');
        if (slack_workspace) addStyle('slack_workspace'); else removeStyleById('slack_workspace');
        if (slack_userProfile) addStyle('slack_userProfile'); else removeStyleById('slack_userProfile');
    } else if (document.getElementsByClassName('mip').length > 0) {
        // remove all stylesheets
        var el = document.getElementsByClassName('mip');
        while (el.length > 0) {
            el[0].parentNode.removeChild(el[0]);
        }
    }
});
