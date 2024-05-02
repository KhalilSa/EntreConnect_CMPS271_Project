import { Text, View, StyleSheet, Image, Pressable, Button } from 'react-native';
import { Notification } from '@/types';
import { router } from 'expo-router';
import UserAvatar from 'react-native-user-avatar';
import { gql, useMutation } from '@apollo/client';

type NotificationListItemProps = {
  notification: Notification;
  refetch: () => void;
};


const updateQuery = gql`
    mutation updateStatus($id: ID!) {
        updateUserconnections(id: $id, status: "Accepted") {
            status
        }
        updateNotifications(id: $id, status: "Accepted") {
            status
        }
    }
`

export default function NotificationListItem({ notification, refetch }: NotificationListItemProps) {
  const [execMutation, {loading, error, data}] = useMutation(updateQuery);

  const handleAccept = async () => {
    try {
        await execMutation({
            variables: {
                id: notification.id
            }
        });
        refetch();
    } catch(e) {
        console.log(e)
    }
  }

  if (error) {
    console.log(error);
    return <Text> Error Accepting request</Text>
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`/users/${notification.profile.id}`)}>
        <View style={styles.header}>
          {notification.profile.image ? (
              <Image source={{ uri: notification.profile.image }} style={styles.userImage} />
          ) : (
              <UserAvatar size={60} name={notification.profile.name} style={styles.userImage}/>
          ) }
          <View>
            <Text style={styles.userName}>{notification.profile.name}</Text>
            <Text>{notification.profile.position}</Text>
          </View>
        </View>
      </Pressable>
      <Text style={styles.status}>Status: {notification.status}</Text>
      {notification.status === 'pending' ? 
        <Button title='Connect' color="#631D76" onPress={handleAccept}/> :
        <Button title='Connected' color="#2E2532" disabled={true}/>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  status: {
    marginLeft: 10,
    padding: 8
  }
});
