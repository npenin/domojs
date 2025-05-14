import { app, BrowserWindow } from 'electron';
import { resolve } from 'path'

const createWindow = () =>
{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        kiosk: true,
    })

    win.loadFile(resolve('./wwwroot/index.html'))
}

app.whenReady().then(() =>
{
    createWindow()
})