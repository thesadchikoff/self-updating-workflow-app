import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from '@renderer/@types/auth'
import authService from '@renderer/services/auth/auth.service'
import userService from '@renderer/services/user/user.service'
import { getProfile, login, registerHandler } from './auth.action'

export const initialState: AuthState = {
  isLoading: false,
  user: userService.getUserFromLocalStorage(),
  error: null as string | null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      authService.logout()
      state.user = null
    },
    updateProfile(state, { payload }) {
      state.user = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.user = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        console.log('From action -> ', action)
        state.user = action.payload
        state.error = null
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
        state.user = null
      })
      .addCase(registerHandler.pending, (state) => {
        state.isLoading = true
        state.user = null
      })
      .addCase(registerHandler.fulfilled, (state, action) => {
        state.isLoading = false
        console.log('From action -> ', action)
        state.user = action.payload
        state.error = null
      })
      .addCase(registerHandler.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
        state.user = null
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false
        console.log('From action -> ', action)
        state.user = action.payload
        state.error = null
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
        state.user = null
      })
  }
})
export const { logout, updateProfile } = authSlice.actions
export const { actions, reducer, caseReducers } = authSlice
