/* eslint-disable prettier/prettier */

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import NoteItem from './noteItem';

const NoteList = ({ notes, onNotePress, onNoteDelete }) => {
    return (
        <FlatList
            data={notes}
            renderItem={({ item }) => (
                <NoteItem
                    note={item}
                    onPress={() => onNotePress(item)}
                    onDelete={() => onNoteDelete(item.id)}
                />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
    },
});

export default NoteList;
