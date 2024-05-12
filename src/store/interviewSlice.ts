import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    speechToken: ''
}

export const interviewSlice = createSlice({
    name: 'interview',
    initialState,
    reducers: {
        initSpeechToken(state, action: PayloadAction<string>) {
            state.speechToken = action.payload
        },
    },
})

export const interviewActions = interviewSlice.actions

