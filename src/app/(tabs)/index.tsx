import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import PostListItem from '@/components/PostListItem';
import Colors from '@/constants/Colors';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const postPaginatedList = gql`
  query postPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
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
`
export default function HomeFeedScreen() {
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore, refetch } = useQuery(postPaginatedList, {variables: {first: 5}});
  const [loadedPosts, setLoadedPosts] = useState([]);
  // const [latestPost, setLatestPost] = useState(null);
  const styles = PostStyles();

  useEffect(() => {
    if (data) {
      setLoadedPosts(data.postPaginatedList);
    }
  }, [data]);

  // const showRecent = async () => {
  //   console.log("trying to reload new post")
  //   try {
  //     // Fetch the latest post
  //     const res = await fetchMore({
  //       variables: { first: 1, after: 0 },
  //     });
  
  //     // Check if the latest post ID is different from the top post ID
  //     const latestPostData = res.data.postPaginatedList[0];
  //     console.log(latestPostData)
  //     if (res.data.postPaginatedList.length > 0 && latestPostData.id !== loadedPosts[0]?.id) {
  //       setLatestPost(latestPostData);
  //       setLoadedPosts([latestPostData, ...loadedPosts]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching latest post:', error);
  //   }
  // };

  const loadMore = async () => {
    if (!hasMore) return;
    const res = await fetchMore({
      variables: {after: loadedPosts.length}
    });

    if (res.data.postPaginatedList.length === 0)
      setHasMore(false)
    else
      setLoadedPosts(prevPosts => [...prevPosts, ...res.data.postPaginatedList]);
  }

  if (loading) return <ActivityIndicator />;
  if (error) {
    console.log(error);
    return <Text>Error with fetching the requested data</Text>;
  }

  return (
    <FlatList 
      data={loadedPosts}
      renderItem={({item}) => <PostListItem post={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refetch}
      // onScroll={(event) => {
      //   const offsetY = event.nativeEvent.contentOffset.y;
      //   if (offsetY === 0) {
      //     showRecent();
      //   }
      // }}
    />
  );
}

const PostStyles = () => {
  const colorTheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
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
