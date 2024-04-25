import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import ExperienceListItem from '@/components/ExperienceListItem'
import { gql, useQuery } from "@apollo/client"
import { Experience } from "@/types";

const query = gql`
  query MyQuery($id: ID!) {
    profile(id: $id) {
      image
      name
      position
      id
      authid
      backimage
      about
      experience {
        companyimage
        companyname
        title
        userid
        id
      }
    }
  }
`

export default function UserProfile() {
    const { id } = useLocalSearchParams();
    const {loading, error, data} = useQuery(query, {variables: {id}});
    const navigation = useNavigation();
    const styles = PostStyles();
    const user = data?.profile;
  
    useLayoutEffect(() => {
      navigation.setOptions({ title: user?.name || "USER" });
    }, [user]);

    

    if (loading) {
      return <ActivityIndicator></ActivityIndicator>
    }
  
    if (error) {
      return <Text>Issue with fetching the data</Text>
    }
  
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={{ uri: user.backimage }} style={styles.backImage} />
          <View style={styles.headerContent}>
            <Image source={{ uri: user.image }} style={styles.image} />
  
            <Text style={styles.name}>{user.name}</Text>
            <Text>{user.position}</Text>
  
            <TouchableOpacity style={styles.button} onPress={() => {console.log('Connected')}}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {user.about && (
          <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text>{user.about}</Text>
          </View>
        )}
  
        <View style={styles.container}>
          <Text style={styles.title}>Experience</Text>
          {user.experience?.map((experience: Experience) => (
            <ExperienceListItem experience={experience} key={experience.id} />
          ))}
        </View>
      </ScrollView>
    );
};

const PostStyles = () => {
    const colorTheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            marginVertical: 5,
            backgroundColor: 'white',
        },
        headerContainer: {
            marginBottom: 5,
            backgroundColor: 'white',
        },
        headerContent: {
            padding: 10,
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
            marginVertical: 5,
        },
        backImage: {
            width: '100%',
            aspectRatio: 4 / 2,
            maxHeight: 250
        },
        image: {
            width: 100,
            aspectRatio: 1,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: 'white',
            marginBottom: 10,
            marginTop: -60
        },
        name: {
            fontSize: 24,
            fontWeight: '500',
        },
    
        button: {
            backgroundColor: 'royalblue',
            padding: 5,
            borderRadius: 100,
            alignItems: 'center',
            marginVertical: 10,
        },
        buttonText: {
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
        },
    });
    return styles;
}   