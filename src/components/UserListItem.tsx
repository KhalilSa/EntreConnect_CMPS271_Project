import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { User } from '@/types';
import { Link } from 'expo-router';
import UserAvatar from 'react-native-user-avatar';

type UserListItemProps = {
  user: User;
  disabled?: boolean 
};

export default function UserListItem({ user, disabled }: UserListItemProps) {
  return (
    <Link href={`/users/${user.id}`} asChild disabled={disabled}>
      <Pressable style={styles.header}>
        {user.image ? (
            <Image source={{ uri: user.image }} style={styles.userImage} />
        ) : (
            <UserAvatar size={60} name={user.name} style={styles.userImage}/>
        ) }
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{user.position}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
});