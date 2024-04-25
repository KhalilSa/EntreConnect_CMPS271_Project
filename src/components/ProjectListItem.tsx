import { Text, View } from '@/components/Themed'
import { Project } from '@/types'
import { Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import ViewMoreText from 'react-native-view-more-text';

type ProjectListItemProps = {
    project: Project;
}


export default function ProjectListItem({ project } : ProjectListItemProps) {
    type OnPressFunction = () => void;
    const renderViewMore = (onPress: OnPressFunction) =>  <Text onPress={onPress}>View more</Text>;
    const renderViewLess = (onPress: OnPressFunction) =>  <Text onPress={onPress}>View less</Text>;

    return (
        <Pressable onPress={() => router.navigate(`posts/${project.id}`)} style={styles.container}>
            <Pressable style={styles.header}>
                <Image source={{uri: project.image ?? "https://dummyimage.com/50x50/000/fff"}} style={styles.img}></Image>
                <View>
                    <Text style={styles.title}>{project.title}</Text>
                    <ViewMoreText
                        numberOfLines={2}
                        renderViewMore={renderViewMore}
                        renderViewLess={renderViewLess}
                        textStyle={styles.description}
                    >
                        <Text> {project.description} </Text>
                    </ViewMoreText>
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Text>Members:</Text>
                        {
                            project.members?.slice(0, 3).map((member) => {
                                return (<Image source={{uri: member.image ?? "https://dummyimage.com/50x50/000/fff" }} style={styles.memberPic} key={member.id}></Image>);
                            })
                        }
                        {project.members?.length > 3 && (
                            <View style={[styles.moreMembers,styles.memberPic]}>
                                <Text style={{fontSize: 10}}>{project.members.length - 3}</Text>
                                <Text style={{fontSize: 12}}>+</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Pressable>
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        margin: 12,
        marginBottom: 0,
        padding: 8,
        width: '100%',
        backgroundColor: 'white',
        marginHorizontal: 0,
        marginVertical: 2,
        borderRadius: 6
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    description: {
        fontSize: 14
    },
    memberPic: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    moreMembers: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    }
});