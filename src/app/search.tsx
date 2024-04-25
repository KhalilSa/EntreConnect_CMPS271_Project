import { StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';

import ProjectListItem from '@/components/ProjectListItem';
import projects from '../../data/projects.json';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import UserListItem from '@/components/UserListItem';

const query = gql`
  query profileSearch($term: String) {
    profileSearch(term: $term) {
      id
      image
      name
      position
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const { data, loading, error } = useQuery(query, {
    variables: { term: `%${search}%` },
  });
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerSearchBarOptions: {
            placeholder: 'Search For People',
            onChangeText: (event: any) => setSearch(event.nativeEvent.text),
        },
    });
  }, [navigation]);

  if (loading && !data?.profileSearch) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error while fetching data from the database</Text>;
  }

  console.log(data?.profileSearch);

  return (
    <FlatList 
      data={data?.profileSearch || []}
      renderItem={({item}) => <UserListItem user={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});