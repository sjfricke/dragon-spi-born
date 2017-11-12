# WebSockets mappings

Each event is given a index number to save from having to send a string. Each event has two parts `<type>:<value>` with Colon inbetween

## Host-to-Web Calls
- `0` - Light switch animation
  - `0` - Turn on
  - `1` - Turn off

## Web-to-Host Calls
- `0` - Light switch animation
  - `0` - Turn on lights
  - `1` - Turn off lights
