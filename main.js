//Install the .bat launch file in startup folder
//------------------------------------------------------
const { exec } = require('child_process')
// const child = exec(
//   'IF NOT EXIST "%userprofile%\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\vj-boucherie.bat" copy static\\extraResources\\vj-boucherie.bat "%userprofile%\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\vj-boucherie.bat"'
// )
// exec(
//   "powershell $s=(New-Object -COM WScript.Shell).CreateShortcut('%USERPROFILE%\\Desktop\\vj-settings.lnk');$s.TargetPath='%localappdata%\\Programs\\vj-boucherie\\resources\\extraResources\\settings.json';$s.Save()"
// )
// exec(
//   "powershell $s=(New-Object -COM WScript.Shell).CreateShortcut('%USERPROFILE%\\Desktop\\vj-folder.lnk');$s.TargetPath='%localappdata%\\Programs\\vj-boucherie\\resources\\extraResources';$s.Save()"
// )
//------------------------------------------------------

const http = require('http')
const { Nuxt, Builder } = require('nuxt')
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)

// Build only in dev mode
if (config.dev) {
  builder.build().catch((err) => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
}
// Listen the server
server.listen(3000)

/*
 ** Electron
 */
let win = null // Current window
const electron = require('electron')
const path = require('path')

const fs = require('fs')
const app = electron.app

let SETTINGS_PATH = path.join(
  process.resourcesPath,
  'extraResources',
  'settings.json'
)
if (config.dev) {
  SETTINGS_PATH = path.join(
    app.getAppPath(),
    'static/extraResources/',
    'settings.json'
  )
}

console.log(SETTINGS_PATH)
//Load external settings
const data = fs.readFileSync(SETTINGS_PATH)
const { settings } = JSON.parse(data)
const settingsStringified = JSON.stringify(JSON.parse(data))

console.log(settings)

//Define entry point with settings as args
const _NUXT_URL_ = `http://localhost:${
  server.address().port
}?data=${settingsStringified}&path=${process.resourcesPath}`

const newWin = () => {
  console.log(electron.screen.getAllDisplays())
  win = new electron.BrowserWindow({
    // width: 5000,
    // height: 300,
    x: 0,
    y: 0,
    frame: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    // fullscreen: true,
    // kiosk: true,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    },

    icon: path.join(__dirname, 'favicon.ico'),
  })
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key == 'Escape' && input.shift) {
      app.exit()
    }
  })
  win.setContentSize(1920, 1080)
  win.on('closed', () => (win = null))
  return win.loadURL(_NUXT_URL_)
}
app.on('ready', newWin)
app.on('window-all-closed', () => {
  app.relaunch()
  app.exit()
})
app.on('activate', () => win === null && newWin())
