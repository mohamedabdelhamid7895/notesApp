/* eslint-disable prettier/prettier */
/* eslint-disable quotes */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = ['#F0E6FA', '#FFE8E0', '#E0F8FF', '#F0FFF8', '#FFF0F1'];

const NoteItem = ({ note, onPress, onDelete, onUpdate, isEditing }) => {
    const [editedContent, setEditedContent] = React.useState(note.content);

    const handleColorChange = (newColor) => {
        onUpdate({ ...note, color: newColor });
    };

    const handleContentChange = (newContent) => {
        setEditedContent(newContent);
    };

    const handleBlur = () => {
        if (editedContent.trim() !== note.content.trim()) {
            if (editedContent.trim() === '') {
                setEditedContent(note.content);
            } else {
                onUpdate({ ...note, content: editedContent.trim() });
            }
        }
        onPress(null);
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => onDelete(), style: "destructive" },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: note.color }]}>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    multiline
                    value={editedContent}
                    onChangeText={handleContentChange}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <TouchableOpacity onPress={() => onPress(note.id)}>
                    <Text style={styles.content}>{note.content}</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.date}>
                created: {new Date(note.updatedAt).toLocaleDateString()}
            </Text>
            <View style={styles.actionContainer}>
                <View style={styles.colorPicker}>
                    {COLORS.map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[styles.colorOption, { backgroundColor: color }]}
                            onPress={() => handleColorChange(color)}
                        />
                    ))}
                <TouchableOpacity onPress={() => onPress(note.id)} style={styles.actionButton}>
                    <Icon name={isEditing ? "check" : "edit"} size={24} color={isEditing ? "#4CAF50" : "#000"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
                    <Icon name="delete" size={24} color="#000" />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    input: {
        fontSize: 16,
        marginBottom: 4,
    },
    content: {
        fontSize: 16,
        marginBottom: 4,
    },
    date: {
        fontSize: 13,
        color: '#888',
        marginBottom: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 16,
    },
    colorPicker: {
        flexDirection: 'row',
        marginLeft: 16,
    },
    colorOption: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 5,
    },
});

export default NoteItem;
