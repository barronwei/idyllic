const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const { join } = require("path")
const { format } = require("url")

let mainWindow

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    "http://localhost:3000" ||
    format({
      pathname: join(__dirname, "../public/index.html"),
      protocol: "file:",
      slashes: true,
    })
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: { nodeIntegration: true },
  })
  mainWindow.loadURL(startUrl)
  mainWindow.webContents.openDevTools()
  mainWindow.on("closed", function () {
    mainWindow = null
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow()
  }
})
