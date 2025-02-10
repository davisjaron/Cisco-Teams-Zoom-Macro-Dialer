const xapi = require('xapi');

// IMPORTANT: Change this to your organization's Teams SIP domain
// This is the domain used in your Teams video conferencing dial string
// Examples:
// - '.company@m.webex.com'     // for Webex CVI
// - '.company@t.plcm.vc'         // for Poly CVI
// - '.company@teams.vc'       // for Pexip CVI
const TEAMS_SIP_DOMAIN = '.company@m.webex.com';

function onTextInput(event) {
    if (event.FeedbackId === 'teams_videoid' && event.Text !== '') {
        const videoID = event.Text;
        const dialString = `${videoID}${TEAMS_SIP_DOMAIN}`;
        
        xapi.command('Dial', { Number: dialString });
    }
}

// Show the text input dialog immediately when the panel opens
function showTeamsDialog() {
    xapi.command('UserInterface.Message.TextInput.Display', {
        Title: 'Enter Teams Video ID',
        Text: 'Enter your Microsoft Teams Video ID (not the meeting ID):',
        InputType: 'Numeric',
        Placeholder: '1234567890',
        FeedbackId: 'teams_videoid'
    });
}

function init() {
    xapi.event.on('UserInterface.Message.TextInput.Response', onTextInput);
    xapi.event.on('UserInterface.Extensions.Panel.Clicked', (event) => {
        if (event.PanelId === 'teams_speed_dial') {
            showTeamsDialog();
        }
    });
}

init(); 
