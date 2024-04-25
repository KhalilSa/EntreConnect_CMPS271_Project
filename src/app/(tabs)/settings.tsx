import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { TouchableOpacity } from 'react-native';
import { useAuth } from "@clerk/clerk-expo";

export default function SettingsScreen() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }

  const onSignOutPress = () => {
    console.log("signed Out")
    signOut()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSignOutPress}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#2E2532',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  }
});
