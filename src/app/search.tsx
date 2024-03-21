import { StyleSheet, FlatList } from 'react-native';

import { Text, View } from '@/components/Themed';
import ProjectListItem from '@/components/ProjectListItem';
import projects from '../../data/projects.json';

export default function SearchScreen() {
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