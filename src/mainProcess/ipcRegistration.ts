import { ipcMain } from "electron"
import ipcTypes from "./ipcTypes"
import { getToken, voiceToText } from "./speech"
export const initIpc = () => {
    ipcMain.handle(ipcTypes.INIT_ALI_TOKEN, getToken)
    ipcMain.on(ipcTypes.VOICE_RECOGNIZATION, voiceToText)
}