import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '@/context/UserContext';

const createProfileMutation = gql`
    mutation CreateProfile($about: String, $name: String = "", $authid: String, $position: String = "Entrepreneur") {
        insertProfile(name: $name, position: $position, about: $about, authid: $authid) {
            about
            name
            id
            authid
            position
        }
    }
`;

const CreateProfileScreen = ({ onSignInPress }: any) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [about, setAbout] = useState('');
  const { authUser, reloadDbUser } = useUserContext();
  const [handleMutation, { loading }] = useMutation(createProfileMutation);

  const onSave = async () => {
    try {
      await handleMutation({
        variables: {
          name,
          about,
          position,
          authid: authUser.id,
        },
      });
      reloadDbUser();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup profile</Text>

      <TextInput
        placeholder="Username"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
      />

      <TextInput
        placeholder="About"
        multiline
        numberOfLines={3}
        value={about}
        onChangeText={setAbout}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    textTransform: 'capitalize'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#5e2a84',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  toggleButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  toggleText: {
    color: '#000000',
  },
  signInText: {
    color: '#5e2a84',
    fontWeight: 'bold',
  },
});

export default CreateProfileScreen;
