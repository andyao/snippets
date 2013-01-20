tell application "Finder"
    set sonicpwd to text returned of (display dialog of "Input Sonic Wall Password:" with hidden answer default answer "")
    activate application "NetExtender"
    tell application "System Events"
      tell process "NetExtender"
        delay 3
        keystroke tab
        keystroke "andy.yao"
        keystroke tab
        keystroke sonicpwd
        
        click button "Connect" of window "SonicWALL NetExtender"
      end tell
    end tell
end tell

