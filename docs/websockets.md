# WebSockets mappings

Each event is given a index number to save from having to send a string. Each event has two parts `<type>:<value>` with Colon inbetween

## Host-to-Web Calls
- `0` - Light switch animation
  - `0` - Turn off
  - `1` - Turn on
- `1` - Speaker animation
  - `0` - Turn off
  - `1` - Turn on

## Web-to-Host Calls
- `0` - Light switch
  - `0` - Turn off lights
  - `1` - Turn on lights
- `1` - Speakers
  - `0` - Turn off Speakers
  - `1` - Turn on Speakers