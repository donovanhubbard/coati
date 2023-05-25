// import { app, BrowserWindow, ipcMain, session } from 'electron';
// import path from 'path';
// import ping from "ping";
const { app, BrowserWindow, ipcMain, session, Menu } = require('electron');
const path = require('path');
const ping = require('ping');
const defaultGateway = require('default-gateway');

const isMac = process.platform === 'darwin'

let configureModal;

const displayConfigureModal = () => {
  if (CONFIGURE_MODAL_VITE_DEV_SERVER_URL) {
    configureModal.loadURL(`${CONFIGURE_MODAL_VITE_DEV_SERVER_URL}/configureModal.html`);
  } else {
    configureModal.loadFile(path.join(__dirname, `../renderer/${CONFIGURE_MODAL_VITE_NAME}/configureModal.html`));
  }
  configureModal.show();
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const sendPing = async (event, host) => {
  return await ping.promise.probe(host);
};

const getGateway = () => {
  const { gateway } = defaultGateway.v4.sync();
  return gateway;
};

const template = [
  // { role: 'appMenu' }
  ...[{
    label: 'Coati',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'File',
    submenu: [
      { 
        label: 'Edit Targets', 
        click: () => {displayConfigureModal()}
      }
    ]
  }],
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.setAboutPanelOptions({
  applicationName: "Coati", 
  applicationVersion: app.getVersion(),
  credits: ['Donovan Hubbard'],
  website: 'https://github.com/donovanhubbard/coati',
  copyright: "(C) 2023 Donovan Hubbard"
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

app.whenReady().then(() => {
  ipcMain.handle('ping:Send',sendPing);
  ipcMain.handle('gateway:Get',getGateway);

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: '/images/coati.png'
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  configureModal = new BrowserWindow({
    width: 600,
    hieght: 400,
    parent: mainWindow, 
    modal: true, 
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: '/images/coati.png'
  });



  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\'']
      }
    })
  })

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      displayWindow();
    }
  });
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
