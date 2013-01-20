#!/usr/bin/osascript
# Get the name of current connected VPN service.
tell application "System Events"
    tell current location of network preferences
        set k to (get kind of every service whose connected of current configuration is true)
        tell application "Finder" to display dialog k
    end tell
end tell
