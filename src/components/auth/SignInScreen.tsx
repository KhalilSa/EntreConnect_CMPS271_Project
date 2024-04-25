import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useSignIn } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { AntDesign } from '@expo/vector-icons';

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Login( { onSignUp } : any ) {
  const colorTheme = useColorScheme();
  const { signIn, setActive, isLoaded } = useSignIn();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  useWarmUpBrowser();
  const onGooglePress = React.useCallback(async () => {
    setErrorMessage("");
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error("OAuth error", err);
      setErrorMessage(err.errors[0].longMessage ?? "An error occurred");
    }
  }, []);
 
  const onSignInPress = async () => {
    setErrorMessage("");
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      console.log('Signed In correctly')
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.errors[0].longMessage ?? "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: Colors[colorTheme ?? 'light'].titleCapital }}>E</Text>
        <Text style={{ color: Colors[colorTheme ?? 'light'].titleSmall }}>ntre</Text>
        <Text style={{ color: Colors[colorTheme ?? 'light'].titleCapital }}>C</Text>
        <Text style={{ color: Colors[colorTheme ?? 'light'].titleSmall }}>onnect</Text>
      </Text>
      <Text style={styles.subtitle}>We would pay you to use our app, please!</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={emailAddress}
        onChangeText={(email) => setEmailAddress(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: 'white', borderColor: 'black', borderWidth: 2}]} onPress={onGooglePress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="google" size={20} color="black"/>
          <Text style={{fontSize: 18, marginLeft: 8}}>Sign In With Google</Text>
          </View>
      </TouchableOpacity>
      <Text style={styles.noAccountText}>
        No account? <Text style={styles.signUpText} onPress={onSignUp}>Sign up</Text>
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
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#5e2a84',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#5e2a84',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  noAccountText: {
    marginTop: 20,
    color: '#000000',
  },
  signUpText: {
    color: '#5e2a84',
    fontWeight: 'bold',
  },
  googleButton: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    padding: 10,
  },
  googleButtonText: {
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  }
});
