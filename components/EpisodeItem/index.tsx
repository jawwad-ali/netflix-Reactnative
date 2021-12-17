import { AntDesign } from "@expo/vector-icons";
import * as React from "react"
import { Image, Pressable } from "react-native";
import { Text, View } from '../../components/Themed';
import styles from "./styles";
import { Episode } from "../../types"

interface EpisodeItemProps {
    episode: Episode
    onPress: (eppisode: Episode) => void
    // onPress: (eppisode: Episode) => {}
}

function EpisodeItem(props: EpisodeItemProps) {
    const { episode, onPress } = props

    return (
        <Pressable style={{ marginBottom: 25 }} onPress={() => onPress(episode)}>
            <View style={styles.row}>
                <Image style={styles.image} source={{ uri: episode.poster }} />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{episode.title}</Text>
                    <Text style={styles.duration}>{episode.duration}</Text>
                </View>

                <AntDesign name="download" size={24} color="white" />

            </View>
            <Text style={styles.plot}>{episode.plot}</Text>
        </Pressable>
    )
}

export default EpisodeItem
