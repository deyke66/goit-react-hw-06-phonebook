import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contactSlice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export const persistor = persistStore(store);
