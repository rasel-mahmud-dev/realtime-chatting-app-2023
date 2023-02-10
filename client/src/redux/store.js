import {  configureStore } from '@reduxjs/toolkit'
import authSlice from "./ slices/authSlice";



const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['action // name '],
            },
        }),
})

export default store