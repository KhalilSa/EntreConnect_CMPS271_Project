import { Experience } from "../types";
import { View, Text, StyleSheet, Image } from "react-native";

type ExperienceListItemProps = {
  experience: Experience;
};
const ExperienceListItem = ({ experience }: ExperienceListItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: experience.companyimage }} style={styles.image} />
      <View>
        <Text style={styles.title}>{experience.title}</Text>
        <Text>{experience.companyname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ExperienceListItem;