import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const inititalStateContact = {
  contactsArray: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: inititalStateContact,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contactsArray.push(action.payload);
      },
      prepare(obj) {
        return {
          payload: {
            ...obj,
          },
        };
      },
    },
    deleteContact(state, action) {
      const idx = state.contactsArray.findIndex(
        contact => contact.id === action.payload
      );
      state.contactsArray.splice(idx, 1);
    },
  },
});
export const contactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
export const { addContact, deleteContact } = contactSlice.actions;
