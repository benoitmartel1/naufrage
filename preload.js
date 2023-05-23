const { remote } = require('electron')
const { exec } = require('child_process')

let currWindow = remote.BrowserWindow.getFocusedWindow()

window.shutdown = function () {
  exec('shutdown')
}
