import { ipcMain } from "electron"
import ipcTypes from "./ipcTypes"
import { getToken } from "./speech"
export const initIpc = () => {
    ipcMain.handle(ipcTypes.INIT_ALI_TOKEN, getToken)
}