import xapi from 'xapi';

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
        
        xapi.Command.Dial({ Number: dialString, CallType: 'Video' });
        meetingID = ''; // Reset the meeting ID
    }
}

function showMeetingDialog() {
    xapi.Command.UserInterface.Message.TextInput.Display({
        Title: 'Enter Zoom Meeting ID',
        Text: 'Enter your Zoom Meeting ID:',
        InputType: 'Numeric',
        Placeholder: '123456789',
        FeedbackId: 'zoom_meetingid'
    });
}

function showPasscodeDialog() {
    xapi.Command.UserInterface.Message.TextInput.Display({
        Title: 'Enter Zoom Passcode (Optional)',
        Text: 'Enter your Zoom Meeting Passcode if required:',
        InputType: 'Numeric',
        Placeholder: '123456',
        FeedbackId: 'zoom_passcode'
    });
}

// Listen for text input response
xapi.Event.UserInterface.Message.TextInput.Response.on(onTextInput);

// Listen for panel opening
xapi.Event.UserInterface.Extensions.Panel.Clicked.on((event) => {
    if (event.PanelId === 'zoom_speed_dial') {
        showMeetingDialog();
    }
}); 