import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { ApolloProvider } from '@apollo/client';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import client from '@/apollo/Client';
import * as SecureStore from "expo-secure-store";
import AuthScreen from '@/components/auth/AuthScreen';
import CreateProfileScreen from '@/components/auth/CreateProfileScreen'
import UserContextProvider, { useUserContext } from '@/context/UserContext';

const CLERK_API_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNavWithProviders />;
}

function RootLayoutNavWithProviders() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider
      publishableKey={CLERK_API_KEY}
      tokenCache={tokenCache}
    >
      <ApolloProvider client={client}>
        <UserContextProvider>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <RootLayoutNav />
          </ThemeProvider>
        </UserContextProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { dbUser, loading } = useUserContext();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <SignedIn>
        {!dbUser ? (
          <CreateProfileScreen />
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="posts/[id]" options={{ title: 'Post' }} />
          </Stack>
        )}
      </SignedIn>
      <SignedOut>
        <AuthScreen />
      </SignedOut>
    </>
  );
}