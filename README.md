# Cisco-Teams-Zoom-Macro-Dialer

Custom macros and UI extensions for Cisco video endpoints to enable one-touch dialing into Microsoft Teams and Zoom. Streamlines meeting access by automating ID and passcode entry.

## Features

- **Teams Speed Dial**: Single-click panel that prompts for Teams video ID and dials into the meeting
- **Zoom Speed Dial**: Single-click panel that prompts for Meeting ID and Passcode, then dials into the meeting
- Clean, simple interface integrated into the device's home screen
- Visual differentiation (Purple for Teams, Blue for Zoom)

## Files

- `teamsMacro.js`: Macro for handling Teams meeting dialing
- `teamsUiExtension.xml`: UI configuration for Teams panel
- `zoomMacro.js`: Macro for handling Zoom meeting dialing
- `zoomUiExtension.xml`: UI configuration for Zoom panel

## Configuration

### Important: Teams SIP Domain
Before using the Teams dialer, you must configure your organization's Teams SIP domain in `teamsMacro.js`:

1. Open `teamsMacro.js`
2. Locate the `TEAMS_SIP_DOMAIN` constant at the top of the file
3. Replace the default value with your organization's Teams SIP domain string

## Installation
1. Log in to your Cisco endpoint's web interface
2. Navigate to the Macro Editor
   - Upload `teamsMacro.js` and `zoomMacro.js`
   - Enable both macros
3. Navigate to the UI Extensions Editor
   - Upload `teamsUiExtension.xml` and `zoomUiExtension.xml`

## Usage

### Teams Meetings
1. Click the purple "Teams Speed Dial" panel on the home screen
2. Enter the Teams Video ID when prompted
3. The system will automatically dial into the meeting

### Zoom Meetings
1. Click the blue "Zoom Speed Dial" panel on the home screen
2. Enter the Zoom Meeting ID when prompted
3. Enter the Zoom Passcode when prompted
4. The system will automatically dial into the meeting

## Dial String Formats

- Teams: `[videoID][TEAMS_SIP_DOMAIN]`
- Zoom: 
  - With passcode: `[meetingID].[passcode]@zoomcrc.com`
  - Without passcode: `[meetingID]@zoomcrc.com`

## Compatibility

Tested on:
- Cisco DX70
- (Add other tested devices here)

## Contributing

Feel free to submit issues and pull requests to improve the functionality.

## License

[Add your chosen license here] 