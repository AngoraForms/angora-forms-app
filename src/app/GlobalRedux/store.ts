'use client'

import { configureStore } from '@reduxjs/toolkit'
import reducer from './Features/slice/slice'

export const store = configureStore({
  reducer: {
    auth: reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;