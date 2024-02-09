import { configureStore } from '@reduxjs/toolkit'
import { reducer as initialState } from '@renderer/store/auth/auth.slice'
export const store = configureStore({
  reducer: initialState,
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
