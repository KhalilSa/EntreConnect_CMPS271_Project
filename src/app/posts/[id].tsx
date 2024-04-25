import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import PostListItem from '@/components/PostListItem';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import {gql, useQuery} from '@apollo/client';

const query = gql`
  query MyQuery($id: ID!) {
    post(id: $id) {
      id
      content
      image
      maxconnection
      connections
      bookmarks
      profile {
        id
        image
        name
        position
      }
    }
  }
`

const PostDetails = () => {
  const { id } = useLocalSearchParams();
  const {loading, error, data} = useQuery(query, {variables: {id}});

  if (loading) {
    return <ActivityIndicator></ActivityIndicator>
  }

  if (error) {
    return <Text>Issue with fetching the data</Text>
  }

  return (
    <ScrollView>
        <PostListItem post={data.post} style={styles.postCard} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    postCard: {
        alignSelf: 'center',
        width: '98%'
    }
});

export default PostDetails;