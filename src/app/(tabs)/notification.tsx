import { ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { gql, useQuery } from '@apollo/client';
import { useUserContext } from '@/context/UserContext';
import NotificationListIem from '@/components/NotificationListItem'


const query = gql`
  query getNotfications($id: ID = "") {
    sentNotificationsList(id: $id) {
      id
      message
      status
      userid
      profile {
        name,
        id,
        image,
        position
      }
    }
  }
`
export default function NotificationScreen() {
  const { dbUser } = useUserContext();
  const {data, loading, error, refetch} = useQuery(query, {
    variables: {id: dbUser.id}
  })
  if (loading) {
    return <ActivityIndicator></ActivityIndicator>
  }
  if (error) {
    return <Text>Error fetching notifications</Text>
  }
  const notifications = data.sentNotificationsList;
  console.log(notifications);
  return (
    <View style={styles.container}>
      {notifications.length != 0 ?
        <FlatList
        data={notifications}
        refreshing={loading}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <NotificationListIem notification={item} refetch={refetch}></NotificationListIem>
        )}
        keyExtractor={(item) => item.id.toString()}
      /> :
      <Text style={{fontSize: 20}}>No notifications</Text>
    }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notificationItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});