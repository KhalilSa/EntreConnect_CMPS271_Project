import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { database } from '../../../firebaseConfig';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';
import UserListItem from '@/components/UserListItem';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query MyQuery {
    profilePaginatedList {
      id
      image
      name
      position
    }
  }
`
export default function ChatScreen() {
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const {loading, error, data} = useQuery(query);
  const [threads, setThreads] = useState(data?.profilePaginatedList);
  
  console.log("threads: " + threads)

  useEffect(() => {
    if (currentThread) {
      const messagesRef = ref(database, `messages/${currentThread.id}`);
      return onValue(messagesRef, snapshot => {
        const loadedMessages = [];
        snapshot.forEach(childSnapshot => {
          loadedMessages.push({
            _id: childSnapshot.key,
            text: childSnapshot.val().text,
            createdAt: new Date(childSnapshot.val().createdAt),
            user: childSnapshot.val().user
          });
        });
        // Reverse the messages here before setting state
        setMessages(loadedMessages.reverse());
      });
    }
  }, [currentThread]);

  const onSend = useCallback((newMessages = []) => {
    newMessages.forEach(message => {
      const messageRef = ref(database, `messages/${currentThread.id}`);
      push(messageRef, {
        text: message.text,
        user: message.user,
        createdAt: serverTimestamp(),
      }).then(() => {
        console.log("Message sent:", message.text);
      }).catch(error => {
        console.error("Error sending message:", error);
      });
    });
  }, [currentThread]);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'purple'
        }
      }}
    />
  );

  console.log(threads);

  const renderChatList = () => (
    <FlatList
      data={threads ?? []}
      keyExtractor={user => user.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setCurrentThread(item)} style={styles.threadContainer}>
          <UserListItem user={item}></UserListItem>
          {/* <Image source={{ uri: user.image }} style={styles.avatar} />
          <View style={styles.threadDetails}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View> */}
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  if (loading) {
    return <ActivityIndicator></ActivityIndicator>
  }

  if (error) {
    return <Text>An Error Has Occured</Text>
  }

  return (
    <View style={styles.container}>
      {currentThread ? (
        <>
          {/* Back button */}
          <TouchableOpacity onPress={() => setCurrentThread(null)} style={styles.backButton}>
            <AntDesign name="back" size={24} color="purple" />
          </TouchableOpacity>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
              name: 'Demo User',
              avatar: 'https://placeimg.com/140/140/any',
            }}
            renderBubble={renderBubble}
          />
        </>
      ) : (
        renderChatList()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  threadContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  threadDetails: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'grey',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});