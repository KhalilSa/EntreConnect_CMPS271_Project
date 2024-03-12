import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import PostListItem from '@/components/PostListItem';
import Colors from '@/constants/Colors';
import posts from '../../../data/posts.json'

export default function HomeFeedScreen() {
  const styles = PostStyles();
  return (
    <FlatList 
      data={posts}
      renderItem={({item}) => <PostListItem post={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const PostStyles = () => {
  const colorTheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors[colorTheme ?? 'light'].feedBackground,
      gap: 6,
      alignSelf: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
  return styles;
}
