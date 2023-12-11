import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  sendNotification: (bodyText: string) => {
    ipcRenderer.send('notify', bodyText)
  }
})