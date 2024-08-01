/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoteList from '../component/noteList';
import { initializeNotes, deleteNote } from '../redux/notesSlice';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notes);

    useEffect(() => {
        dispatch(initializeNotes());
    }, [dispatch]);

    const handleNotePress = (note) => {
        navigation.navigate('EditNote', { noteId: note.id });
    };

    const handleNoteDelete = (id) => {
        dispatch(deleteNote(id));
    };

    const handleAddNote = () => {
        navigation.navigate('EditNote');
    };

    return (
        <View style={styles.container}>
            <NoteList
                notes={notes}
                onNotePress={handleNotePress}
                onNoteDelete={handleNoteDelete}
            />
            <TouchableOpacity style={styles.add} onPress={handleAddNote}>
                <Icon name="add" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    add: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
});

export default HomeScreen;
