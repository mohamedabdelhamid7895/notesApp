/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { initializeNotes, addNote, updateNote, deleteNote } from '../redux/notesSlice';
import NoteItem from '../component/noteItem';

const COLORS = ['#E6E6FA', '#FFE4E1', '#E0FFFF', '#F0FFF0', '#FFF0F5'];

const NotesScreen = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notes);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [editingNoteId, setEditingNoteId] = useState(null);

    useEffect(() => {
        dispatch(initializeNotes());
    }, [dispatch]);

    const filteredNotes = notes.filter(note =>
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddNote = () => {
        if (newNoteContent.trim() === '') {
            Alert.alert('Error', 'Note content cannot be empty');
            return;
        }
        dispatch(addNote({
            id: Date.now().toString(),
            content: newNoteContent.trim(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            color: selectedColor,
        }));
        setNewNoteContent('');
        setModalVisible(false);
    };

    const handleUpdateNote = (updatedNote) => {
        if (updatedNote.content.trim() === '') {
            Alert.alert('Error', 'Note content cannot be empty');
            return;
        }
        dispatch(updateNote({
            ...updatedNote,
            updatedAt: Date.now(),
        }));
    };

    const toggleEditMode = (noteId) => {
        setEditingNoteId(noteId);
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                {searchQuery ? 'No notes found matching your search' : 'No notes yet. Add your first note!'}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="search here.."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredNotes}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onPress={toggleEditMode}
                        onDelete={() => dispatch(deleteNote(item.id))}
                        onUpdate={handleUpdateNote}
                        isEditing={editingNoteId === item.id}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmptyComponent}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="add" size={30} color="#FFF" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={[styles.modalInput, { backgroundColor: selectedColor }]}
                            multiline
                            value={newNoteContent}
                            onChangeText={setNewNoteContent}
                            placeholder="Type your note here..."
                        />
                        <View style={styles.colorPicker}>
                            {COLORS.map(color => (
                                <TouchableOpacity
                                    key={color}
                                    style={[styles.colorOption, { backgroundColor: color }]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleAddNote}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 80,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#4CAF50',
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        maxHeight: '80%',
    },
    modalInput: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    colorPicker: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 20,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NotesScreen;
