import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      return [...state, action.payload]
    },
      removeContact(state, action) {
      return state.filter(({ id }) => id !== action.payload)
    }
  },
})

export const { addContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;

export const getContacts = state => state.contacts;