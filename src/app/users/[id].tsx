import { Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import users from '../../../data/user.json'

export default function UserProfile() {
    const [user, setUser] = useState(users);
    const { id } = useLocalSearchParams();
    return (
        <Text>{id}</Text>
    );
}