/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';
import { loadNotes, saveNotes } from '../utils/storage';

const initialState = {
    notes: [],
    loading: false,
    error: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        addNote: (state, action) => {
            state.notes.unshift(action.payload);
            saveNotes(state.notes);
        },
        updateNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
                saveNotes(state.notes);
            }
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            saveNotes(state.notes);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setNotes, addNote, updateNote, deleteNote, setLoading, setError } = notesSlice.actions;

export const initializeNotes = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const notes = await loadNotes();
        dispatch(setNotes(notes));
    } catch (error) {
        dispatch(setError('Failed to load notes'));
    } finally {
        dispatch(setLoading(false));
    }
};

export default notesSlice.reducer;

