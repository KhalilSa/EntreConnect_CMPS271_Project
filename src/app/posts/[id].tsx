import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import posts from '../../../data/posts.json';
import PostListItem from '@/components/PostListItem';
import { ScrollView, StyleSheet } from 'react-native';

const PostDetails = () => {
  const { id } = useLocalSearchParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <Text>Not found</Text>;
  }

  return (
    <ScrollView>
        <PostListItem post={post} style={styles.postCard} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    postCard: {
        alignSelf: 'center',
    }
});

export default PostDetails;