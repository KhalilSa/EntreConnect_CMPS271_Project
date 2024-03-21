import React, { useState } from 'react';
import {
  StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform, Image, SafeAreaView, View as DefaultView, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

type Img = {
  uri: string
};

export default function PostScreen() {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<Img[]>([]);

  const handlePost = () => {
    console.log('Post description:', description);
    // Handle post action
    setDescription('');
    router.push('/(tabs)/');
  };

  const handleAddMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1, // TODO: can be changed from user settings
    });

    console.log(result);

    if (!result.canceled) {
      setImages([...images, {uri: result.assets[0].uri}]);
    }
  };

  // const handleAddMedia = () => {
  //   setImages([...images, { uri: 'https://via.placeholder.com/100' }]);
  // };

  const handleRemoveImage = (index: number) => {
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
        <ScrollView style={styles.imagesContainer} horizontal={true}>
          {images.map((img: Img, index) => (
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
        </ScrollView>
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
    fontSize: 18,
    textAlignVertical: 'top',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  imagesContainer: {
    flexDirection: 'row',
    padding: 16,
    flexGrow: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  postButton: {
    marginLeft: 'auto',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#631D76',
    borderRadius: 8
  },
  postText: {
    color: '#FBFBFB',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
