import {Text, View} from '@/components/Themed'
import { Image, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Post } from '@/types'
import { useColorScheme } from './useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import ViewMoreText from 'react-native-view-more-text';
import UserAvatar from 'react-native-user-avatar';


type PostListItemProps = {
    post: Post;
    style?: ViewStyle;
}

type FooterButtonProps = {
    text: string,
    icon: React.ComponentProps<typeof FontAwesome>['name'],
    footerBtnStyle: ViewStyle,
    colorScheme: Record<string, string>;
}

function FooterButton({ text, icon, footerBtnStyle, colorScheme }: FooterButtonProps) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name={icon} size={24} color={colorScheme.postIconDefault} />
            <Text style={footerBtnStyle}>{text}</Text>
        </View>
    );
}

export default function PostListItem({ post, style }: PostListItemProps) {
    type OnPressFunction = () => void;
    const renderViewMore = (onPress: OnPressFunction) =>  <Text onPress={onPress}>View more</Text>;
    const renderViewLess = (onPress: OnPressFunction) =>  <Text onPress={onPress}>View less</Text>;
    const colorScheme = Colors[useColorScheme() ?? 'light'];
    const styles = PostStyles();
    const combinedPostCardStyles = [styles.postCard, style];

    return (
        <Pressable style={StyleSheet.flatten(combinedPostCardStyles)} onPress={() => router.navigate(`posts/${post.id}`)}>
            {/* Header */}
            {post.profile && (
                <View style={{margin: 12, marginBottom: 0}}>
                    <Pressable style={styles.header} onPress={() => router.navigate(`users/${post.profile.id}`)}>
                        <UserAvatar size={60} name={post.profile.name} style={styles.userImage}/>
                        <View>
                            <Text style={styles.username}>{post.profile.name}</Text>
                            <ViewMoreText
                                numberOfLines={2}
                                renderViewMore={renderViewMore}
                                renderViewLess={renderViewLess}
                            >
                                <Text> {post.profile.position} </Text>
                            </ViewMoreText>
                        </View>
                    </Pressable>
                </View>
            )}
            {/* Text Content */}
            <Text style={styles.postContent}>{post.content}</Text>
            {/* Image Content */}
            {post.image && (
                <Image source={{uri: post.image}} style={styles.postImage}></Image>
            )}
            <View style={styles.postStats}>
                <Text>{post.connections}/{post.maxconnection} Connections</Text>
                <Text>•</Text>
                <Text>{post.bookmarks} Bookmarks</Text>
            </View>
            {/* Footer */}
            <View style={styles.line} />
            <View style={{flexDirection: 'row', justifyContent: 'center', borderRadius: 20}}>
                <View style={{flexDirection: 'row', gap: 28, padding: 6}}>
                    <FooterButton text='Connect' icon='users' footerBtnStyle={styles.footerBtn} colorScheme={colorScheme}></FooterButton>
                    <FooterButton text='Bookmark' icon='bookmark' footerBtnStyle={styles.footerBtn} colorScheme={colorScheme}></FooterButton>
                </View>
            </View>
        </Pressable>
    );
}

const PostStyles = () => {
    const colorScheme = Colors[useColorScheme() ?? 'light'];
    const styles = StyleSheet.create({
        postCard: {
            borderRadius: 16,
            borderColor: colorScheme.borderColor,
            borderWidth: 1,
            backgroundColor: colorScheme.background,
            marginHorizontal: 4,
            maxWidth: 580
        },
        /* Header */
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
        },
        username: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 4,
        },
        userImage: {
            width: 50,
            height: 50,
            borderRadius: 25
        },

        /* Body */
        postContent: {
            margin: 12
        },
        postImage: {
            width: '98%',
            aspectRatio: 4 / 3,
            borderRadius: 16,
            margin: 2
        },
        postStats: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 4,
            marginRight: 8,
            padding: 4
        },

        /* Footer */
        line: {
            borderBottomColor: colorScheme.borderColor,
            borderBottomWidth: 1,
            marginVertical: 4,
            marginLeft: 8,
            marginRight: 8,
            opacity: .15,
        },
        footer: {
            justifyContent: 'center'
        }, 
        footerBtn: {
            padding: 8,
            fontWeight: '500'
        }
    });
    return styles;
}