// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("pingProvider", {
  sendPing: async () => {
    return await ipcRenderer.invoke('ping:Send');
  },
  ping: () => 'pong',
});