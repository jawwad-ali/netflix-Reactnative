import React, { useState, useRef } from "react"
import { Text, View } from '../../components/Themed';
import { Episode } from "../../types"
import { Video } from "expo-av"
import { Playback } from "expo-av/build/AV";
import styles from "./style"
import { useEffect } from "react";
import { Storage } from 'aws-amplify';
import { DataStore } from "aws-amplify"

interface videPlayerProps {
    episode: Episode
}

function VideoPlayerComponent(props: videPlayerProps) {
    const { episode } = props
    const [videoURL, setVideoURL] = useState('');

    const [status, setStatus] = useState({});
    const video = useRef<Playback>(null);

    useEffect(() => {
        if (episode.video.startsWith('http')) {
            setVideoURL(episode.video);
            return;
        }
        Storage.get(episode.video).then(setVideoURL);
    }, [episode])


    useEffect(() => {
        if (!video) {
            return;
        }
        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                { uri: videoURL },
                {},
                false
            );
        })();
    }, [videoURL])
    if (videoURL === '') {
        return null;
    }

    return (
        <Video
            ref={video}
            style={styles.video}
            source={{
                uri: videoURL,
            }}
            posterSource={{
                uri: episode.poster,
            }}
            posterStyle={{
                resizeMode: 'cover',
            }}
            usePoster={false}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
    )
}

export default VideoPlayerComponent