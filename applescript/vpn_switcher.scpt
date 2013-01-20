#!/usr/bin/osascript
# Switch VPN services.
on alfred_script(q)
  set disconnectVPN to false
  set vpnNamePrefix to "CiscoIPSec-"
  if length of (q as string) is greater than 0 then
    if (q as string) is equal to "off" then
      set disconnectVPN to true
    else
      set vpnName to vpnNamePrefix & q
    end if
  else
    set vpnName to vpnNamePrefix & "05"
  end if

  tell application "System Events"
    tell current location of network preferences
      set connectedNames to (get name of every service whose (kind is equal to 10) and (connected of current configuration is true))
      if the count of connectedNames is greater than 0 then
        set VPNservice to service (first item of connectedNames)
        disconnect VPNservice
      end if

      if disconnectVPN is true then return

      set VPNservice to service vpnName
      if exists VPNservice then set isConnected to connected of current configuration of VPNservice
      if isConnected is false then 
          connect VPNservice
      else 
          disconnect VPNservice
      end if
    end tell
  end tell  
end alfred_script
