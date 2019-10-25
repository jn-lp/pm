// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
		},
		transparent: false,
		title: "pm."
	})

	const menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{
					label:'Exit',
					click() {
						app.quit()
					}
				}
			]
		}
	])
	Menu.setApplicationMenu(menu);

	const startUrl = process.env.ELECTRON_START_URL || "http://localhost:3000" || url.format({
		pathname: path.join(__dirname, '/../build/index.html'),
		protocol: 'file:',
		slashes: true
	});

	mainWindow.loadURL(startUrl);
  mainWindow.on('closed', () => {
		mainWindow = null
  })
}

app.on('ready', () => {
	createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
