import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import UserListItem from '@/components/UserListItem';
import { useUserContext } from '@/context/UserContext';
import { router } from 'expo-router';

const SEND_CREDITS_MUTATION = gql`
  mutation MyMutation($senderId: ID!, $receiverId: ID!, $amount: Int!) {
    SendCredits(senderId: $senderId, receiverId: $receiverId, amount: $amount) {
      id
    }
  }
`;

const QUERY_SEARCH_USERS = gql`
  query SearchUsers($term: String!) {
    profileSearch(term: $term) {
      id
      image
      name
      position
    }
  }
`;

const Credits: React.FC = () => {
  const { dbUser } = useUserContext();
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userSelected, setUserSelected] = useState(null);
  const [searchUsers, { loading, error, data }] = useLazyQuery(QUERY_SEARCH_USERS);
  const [sendCredits, { loading: sending, error: sendError, data: sendCreditsData }] = useMutation(SEND_CREDITS_MUTATION);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim().length > 0) {
      searchUsers({ variables: { term: text } });
    }
  };

  const handleSendCredits = () => {
    sendCredits({
      variables: {
        senderId: dbUser?.id,
        receiverId: userSelected,
        amount: parseInt(amount),
      },
    });
    router.back();
  };

  const handleSelectUser = (userId: any) => {
    setUserSelected(userId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Credits</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for recipients..."
        onChangeText={handleSearch}
        value={searchTerm}
      />
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error while fetching data from the database</Text>
      ) : data?.profileSearch?.length > 0 && !userSelected ? (
        <FlatList
          style={{width: '100%', maxHeight: 100}}
          data={data.profileSearch}
          renderItem={({ item }) => (
            <Pressable style={styles.userContainer} onPress={() => handleSelectUser(item.id)}>
                <UserListItem user={item} disabled={true}/>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : userSelected ? (
        <Text>User Has been Selected</Text>
      ) : (
        <Text>No users found</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
        />
        <Button title="Send" onPress={handleSendCredits} disabled={sending} color="purple" />
      </View>
      {sending && <Text>Sending...</Text>}
      {sendError && <Text>Error: {sendError.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  userContainer: {
    height: 60,
    marginBottom: 10,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  }
});

export default Credits;