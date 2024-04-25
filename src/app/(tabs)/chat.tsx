import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { database } from '../../../firebaseConfig';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [threads, setThreads] = useState([
    {
      id: 'static-1',
      name: 'Test Chat',
      avatar: 'https://placeimg.com/140/140/people',
      lastMessage: 'This is a static test chat!'
    }
  ]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);

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

  const renderChatList = () => (
    <FlatList
      data={threads}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setCurrentThread(item)} style={styles.threadContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.threadDetails}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {currentThread ? (
        <>
          {/* Back button */}
          <TouchableOpacity onPress={() => setCurrentThread(null)} style={styles.backButton}>
            <Ionicons name="md-arrow-back" size={24} color="purple" />
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
