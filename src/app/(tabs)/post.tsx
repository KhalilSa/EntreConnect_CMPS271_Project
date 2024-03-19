import React, { useState } from 'react';
import {
  StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform, Image, SafeAreaView, View as DefaultView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';

export default function PostScreen() {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handlePost = () => {
    console.log('Post description:', description);
    // Handle post action
  };

  const handleAddMedia = () => {
    setImages([...images, { uri: 'https://via.placeholder.com/100' }]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, imgIndex) => imgIndex !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Add a description..."
          placeholderTextColor="#666"
          multiline
        />
        <View style={styles.imagesContainer}>
          {images.map((img, index) => (
            <DefaultView key={index} style={styles.imageWrapper}>
              <Image source={{ uri: img.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveImage(index)}
              >
                <Ionicons name="close-circle" size={24} color="#5e2a84" />
              </TouchableOpacity>
            </DefaultView>
          ))}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.mediaButton} onPress={handleAddMedia}>
            <Ionicons name="image" size={32} color="#5e2a84" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  imagesContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    padding: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  mediaButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  postButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  postText: {
    color: '#5e2a84',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
