import { StyleSheet, FlatList } from 'react-native';

import ProjectListItem from '@/components/ProjectListItem';
import projects from '../../data/projects.json';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerSearchBarOptions: {
            placeholder: 'Search Projects',
            onChangeText: setSearch,
        },
    });
  }, [navigation]);
  return (
    <FlatList 
      data={projects}
      renderItem={({item}) => <ProjectListItem project={item} />}
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