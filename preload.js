const { remote } = require('electron')
const { exec } = require('child_process')

let currWindow = remote.BrowserWindow.getFocusedWindow()

window.shutdown = function () {
  exec('shutdown /p')
}
window.reboot = function () {
  exec('shutdown /r /t 1')
}
