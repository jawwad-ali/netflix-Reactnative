import React, { useState, useRef } from "react"
import { Text, View } from '../../components/Themed';
import { Episode } from "../../types"
import { Video } from "expo-av"
import { Playback } from "expo-av/build/AV";
import styles from "./style"
import { useEffect } from "react";

interface videPlayerProps {
    episode: Episode
}

function VideoPlayerComponent(props: videPlayerProps) {
    const { episode } = props

    const [status, setStatus] = useState({});
    const video = useRef<Playback>(null);

    useEffect(() => {
        if (!video) {
            return
        }
        (async () => {
            await video.current?.unloadAsync()
            await video.current?.loadAsync(
                { uri: episode.video },
                {},
                false
            )
        })()
    }, [episode])

    return (
        <View>
            <Video
                style={styles.video}
                ref={video}
                source={{
                    uri: episode.video,
                }}
                posterSource={{
                    uri: episode.poster
                }}
                posterStyle={{
                    resizeMode: "cover"
                }}
                useNativeControls
                usePoster={false}
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    )
}

export default VideoPlayerComponent