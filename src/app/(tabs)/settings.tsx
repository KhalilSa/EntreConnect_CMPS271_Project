import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, Pressable, Appearance, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from "@clerk/clerk-expo";
import { gql, useQuery } from "@apollo/client";
import { useUserContext } from '@/context/UserContext';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const query = gql`
  query MyQuery($id:ID!) {
    profile(id: $id) {
      credits,
      name
    }
  }
`;

export default function SettingsScreen() {
  const { isLoaded, signOut } = useAuth();
  const { dbUser } = useUserContext();
  const { loading, error, data, refetch } = useQuery(query, {
    variables: {
      id: dbUser.id,
    }
  });

  if (!isLoaded) {
    return null;
  }

  const onSignOutPress = () => {
    console.log("Signed Out");
    signOut();
  };

  return (
    <View style={styles.container}>
      {/* Profile details */}
      <Pressable style={styles.section} onPress={() => router.push(`users/${dbUser.id}`)}>
        <Text style={styles.title}>View My Profile</Text>
      </Pressable>
      <Pressable style={styles.section}>
        <Text style={styles.title}>Edit My Profile</Text>
        <FontAwesome name="pencil" size={18} color="purple" />
      </Pressable>

      {/* Credits */}
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>Credits: </Text>
          <Text style={styles.title}>{loading ? 'Loading...' : (error ? 'Error' : data?.profile?.credits)}</Text>
        </View>
        <Button title='Send Credits' color="purple" onPress={() => {
            router.push('/credits');
            refetch();
          }}></Button>
      </View>

      {/* View Bookmarks */}
      <Pressable style={styles.section} onPress={() => console.log('View Bookmarks')}>
        <Text style={styles.title}>View Bookmarks</Text>
      </Pressable>

      {/* Sign Out Button */}
      <Pressable style={styles.button} onPress={onSignOutPress}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#2E2532',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
