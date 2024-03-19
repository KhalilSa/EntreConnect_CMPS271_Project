import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EntreConnect</Text>
      <Text style={styles.subtitle}>We would pay you to use our app, please!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.noAccountText}>
        Already have an account? <Text style={styles.signUpText} onPress={() => navigation.navigate('Login')}>Sign in</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', 
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#5e2a84',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
  },
  input: {
    width: '30%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  button: {
    width: '30%',
    padding: 15,
    backgroundColor: '#5e2a84',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  noAccountText: {
    marginTop: 20,
    color: '#000000',
  },
  signUpText: {
    color: '#5e2a84',
    fontWeight: 'bold',
  },
});
