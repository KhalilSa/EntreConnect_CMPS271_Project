import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import PostListItem from '@/components/PostListItem';
import Colors from '@/constants/Colors';
import { gql, useQuery } from '@apollo/client';

const postList = gql`
query postList {
  postList {
    id
    image
    connections
    profile {
      image
      name
      id
      position
    }
    content
    bookmarks
    maxconnection
  }
}
`;


export default function HomeFeedScreen() {
  const { loading, error, data } = useQuery(postList);
  if (loading) return <ActivityIndicator />;
  if (error) {
    console.log(error);
    return <Text>Error with fetching the requested data</Text>;
  }

  const styles = PostStyles();
  return (
    <FlatList 
      data={data.postList}
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
