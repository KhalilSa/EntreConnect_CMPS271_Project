import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignInScreen from './SignInScreen';
import { useState } from 'react';
import SignUpScreen from './SignUpScreen';

const AuthScreen = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <View style={{ height: '100%', width: '100%'}}>
      {isSignIn ? (
        <SignInScreen onSignUp={() => setIsSignIn(false)}/>
      ) : (
        <SignUpScreen onSignIn={() => setIsSignIn(true)}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', 
  },
  noAccountText: {
    marginTop: 20,
    color: '#000000',
  },
  signUpText: {
    color: '#5e2a84',
    fontWeight: 'bold',
  },
  changeTab: {
    alignSelf: 'center'
  }
});


export default AuthScreen;