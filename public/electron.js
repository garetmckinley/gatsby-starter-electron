const electron = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:8000"
      : `file://${path.join(__dirname, "../build/indexedDB.html")}`
  );

  if (process.platform === "darwin") {
    app.setAboutPanelOptions({
      applicationName: "Gatsby Electron Starter",
      applicationVersion: "0.1.0",
    });
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
