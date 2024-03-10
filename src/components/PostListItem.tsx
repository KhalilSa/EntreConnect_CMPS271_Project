import {Text, View} from '@/components/Themed'
import { Image, StyleSheet } from 'react-native';
import { Post } from '@/types'
import { useColorScheme } from './useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

type PostListItemProps = {
    post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
    const styles = PostStyles();
    return (
        <View style={styles.postCard}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{uri: post.author.image}} style={styles.userImage}></Image>
                <View>
                    <Text style={styles.username}>{post.author.name}</Text>
                    <Text>{post.author.position}</Text>
                </View>
            </View>
            {/* Text Content */}
            <Text style={styles.postContent}>{post.content}</Text>
            {/* Image Content */}
            {post.image && (
                <Image source={{uri: post.image}} style={styles.postImage}></Image>
            )}
            <View style={styles.postStats}>
                <Text>{post.connections}/{post.maxConnection} Connections</Text>
                <Text>•</Text>
                <Text>{post.bookmarks} Bookmarks</Text>
            </View>
            {/* Footer */}
            <View style={styles.line} />
            <View style={{flexDirection: 'row', justifyContent: 'center', borderRadius: 20}}>
                <View style={{flexDirection: 'row', gap: 28, padding: 6}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name="users" size={24} color='black' />
                        <Text style={{padding: 8}}>Connect</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name="bookmark" size={24} color='black' />
                        <Text style={{padding: 8}}>Bookmark</Text>
                    </View>
                </View>
            </View>
        </View>
        
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
        },
        /* Header */
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            margin: 12,
            marginBottom: 0,
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
            aspectRatio: 1,
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
        }
    });
    return styles;
}