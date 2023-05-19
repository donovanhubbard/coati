// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pingProvider", {
  sendPing: async (host) => {
    return await ipcRenderer.invoke('ping:Send',host);
  },
  getGateway: () => {
    return ipcRenderer.invoke('gateway:Get');
  }
});