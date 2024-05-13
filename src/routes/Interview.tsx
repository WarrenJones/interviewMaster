import React from "react";
import ipcTypes from "../mainProcess/ipcTypes";
import { useAppDispatch } from "../store";
import { baseActions } from "../store/baseSlice";
export default () => {
  const appDispatch = useAppDispatch();
  return (
    <button
      onClick={() => {
        electron.ipcRenderer
          .invoke(ipcTypes.INIT_ALI_TOKEN)
          .then((result: string) => {
            console.log('testtt',result)
            appDispatch(baseActions.initSpeechToken(result));
          });
      }}
    >
      开始面试
    </button>
  );
};
