import React from "react"
import ipcTypes from "../mainProcess/ipcTypes"
export default ()=><button onClick={()=>{
    electron.ipcRenderer.invoke(ipcTypes.INIT_ALI_TOKEN)
}}>开始面试</button>