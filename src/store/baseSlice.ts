import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    speechToken: ''
}

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        initSpeechToken(state, action: PayloadAction<string>) {
            state.speechToken = action.payload
        },
    },
})

export const baseActions = baseSlice.actions

