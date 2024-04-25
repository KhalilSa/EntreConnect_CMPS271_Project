import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUp( { onSignIn } : any ) {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const colorTheme = useColorScheme();
 
  // start the sign up process.
  const onSignUpPress = async () => {
    setErrorMessage("");
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage(err.errors[0].longMessage ?? err.errors[0].message ??"An error occurred");
      console.log(errorMessage);
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    setErrorMessage(""); 
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage(err.errors[0].longMessage ?? err.errors[0].message ?? "An error occurred");
    }
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      {!pendingVerification && (
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={{ color: Colors[colorTheme ?? 'light'].titleCapital }}>E</Text>
            <Text style={{ color: Colors[colorTheme ?? 'light'].titleSmall }}>ntre</Text>
            <Text style={{ color: Colors[colorTheme ?? 'light'].titleCapital }}>C</Text>
            <Text style={{ color: Colors[colorTheme ?? 'light'].titleSmall }}>onnect</Text>
          </Text>
          <Text style={styles.subtitle}>We would pay you to use our app, please!</Text>

          <View style={styles.nameContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="First Name"
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={(email) => setEmailAddress(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.noAccountText}>
            Already have an account? <Text style={styles.signUpText} onPress={onSignIn}>Sign in</Text>
          </Text>
        </View>
      )}

      {pendingVerification && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Verification Code..."
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity onPress={onPressVerify} style={styles.button}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
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
    fontSize: 54,
    fontWeight: 'bold',
    color: '#5e2a84',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    width: '90%'
  },
  input: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#F0F0F0'
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
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  }
});
