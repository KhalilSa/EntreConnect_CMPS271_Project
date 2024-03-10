import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import PostListItem from '@/components/PostListItem';
import Colors from '@/constants/Colors';
import posts from '../../../data/posts.json'

const firstPost = posts[0];
export default function TabOneScreen() {
  const styles = PostStyles();
  return (
    <View style={styles.container}>
      <PostListItem post={firstPost}/>
    </View>
  );
}

const PostStyles = () => {
  const colorTheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors[colorTheme ?? 'light'].feedBackground,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
  return styles;
}
