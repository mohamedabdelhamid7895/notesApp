/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_STORAGE_KEY = '@notes_app_notes';

export const loadNotes = async () => {
    try {
        const notesJson = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
        return notesJson ? JSON.parse(notesJson) : [];
    } catch (error) {
        console.error('Failed to load notes:', error);
        return [];
    }
};

export const saveNotes = async (notes) => {
    try {
        await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Failed to save notes:', error);
    }
};
