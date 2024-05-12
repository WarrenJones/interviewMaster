import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { baseSlice } from "./baseSlice";
import { interviewSlice } from "./interviewSlice";
import {
    configureStore,
    createListenerMiddleware,
} from '@reduxjs/toolkit'
const listenerMiddlewareInstance = createListenerMiddleware({
    onError: () => console.error,
})

const store = configureStore({
    reducer: {
        [baseSlice.name]: interviewSlice.reducer,
        [interviewSlice.name]: interviewSlice.reducer,
    },
    middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
})

export { store }
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector