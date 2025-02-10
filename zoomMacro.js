const xapi = require('xapi');

let meetingID = '';

function onTextInput(event) {
    if (event.FeedbackId === 'zoom_meetingid' && event.Text !== '') {
        meetingID = event.Text;
        // After getting meeting ID, prompt for optional passcode
        showPasscodeDialog();
    }
    else if (event.FeedbackId === 'zoom_passcode') {
        // Note: event.Text will be empty string if user hits OK without entering anything
        const passcode = event.Text;
        // If passcode is empty, dial without it
        const dialString = passcode ? 
            `${meetingID}.${passcode}@zoomcrc.com` : 
            `${meetingID}@zoomcrc.com`;
        
        xapi.command('Dial', { Number: dialString });
        meetingID = ''; // Reset the meeting ID
    }
}

function showMeetingDialog() {
    xapi.command('UserInterface.Message.TextInput.Display', {
        Title: 'Enter Zoom Meeting ID',
        Text: 'Enter your Zoom Meeting ID:',
        InputType: 'Numeric',
        Placeholder: '123456789',
        FeedbackId: 'zoom_meetingid'
    });
}

function showPasscodeDialog() {
    xapi.command('UserInterface.Message.TextInput.Display', {
        Title: 'Enter Zoom Passcode (Optional)',
        Text: 'Enter your Zoom Meeting Passcode if required:',
        InputType: 'Numeric',
        Placeholder: '123456',
        FeedbackId: 'zoom_passcode'
    });
}

function init() {
    xapi.event.on('UserInterface.Message.TextInput.Response', onTextInput);
    xapi.event.on('UserInterface.Extensions.Panel.Clicked', (event) => {
        if (event.PanelId === 'zoom_speed_dial') {
            showMeetingDialog();
        }
    });
}

init(); 
