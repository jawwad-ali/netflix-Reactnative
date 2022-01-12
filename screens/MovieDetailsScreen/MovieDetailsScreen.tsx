import React, { useEffect, useState } from "react"
import { Text, View } from '../../components/Themed';
import styles from "./style"

import { FlatList, Pressable } from "react-native";
import { MaterialIcons, Entypo, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import EpisodeItem from "../../components/EpisodeItem";
import { Picker } from '@react-native-picker/picker';
import VideoPlayerComponent from "../../components/VideoPlayer";

import { DataStore } from "aws-amplify"

import { Movie, Season, Episode } from "../../src/models"
import { useRoute } from "@react-navigation/native"

function MovieDetailsScreen() {
    const [movie, setMovie] = useState<Movie | undefined>(undefined);
    const [seasons, setSeasons] = useState<Season[]>([])
    const [episodes, setEpisodes] = useState<Episode[]>([])

    // current season selected by the user
    const [currentSeason, setCurrentSeason] = useState<Season | undefined>(undefined)
    // episode season selected by the user
    const [currentEpisode, setCurrentEpisode] = useState<Episode | undefined>(undefined)

    // season name for the Picker
    const seasonNames = seasons ? seasons.map(season => season.name) : []
    // current Route
    const route = useRoute()

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setMovie(await DataStore.query(Movie, route?.params?.id))
        }
        fetchMovieDetails()
    }, [])

    useEffect(() => {
        // fetch season
        if (!movie) {
            return;
        }
        const fetchSeasons = async () => {
            const movieSeasons = (await DataStore.query(Season)).filter(s => s.movie?.id == movie.id);
            setSeasons(movieSeasons);
            setCurrentSeason(movieSeasons[0]);
        }
        fetchSeasons();
    }, [movie])

    useEffect(() => {
        if (!currentSeason) return

        const fetchEpisodes = async () => {
            const seasonEpisode = (await DataStore.query(Episode)).filter(episode => episode?.season?.id == currentSeason.id)
            setEpisodes(seasonEpisode)
            setCurrentEpisode(seasonEpisode[0])
        }
        fetchEpisodes()
    }, [currentSeason])

    return (
        <View style={{ flex: 1 }}>
            {currentEpisode && <VideoPlayerComponent episode={currentEpisode} />}
            <FlatList
                data={episodes}
                renderItem={({ item }) => (
                    <EpisodeItem
                        episode={item}
                        onPress={setCurrentEpisode}
                    />)}
                ListHeaderComponent={(
                    <View style={{ padding: 12 }}>
                        <Text style={styles.title}>{movie?.title}</Text>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.match}>98% match</Text>
                            <Text style={styles.year}>{movie?.year}</Text>

                            <View style={styles.ageContainer}>
                                <Text style={styles.age}>12+</Text>
                            </View>

                            <Text style={styles.year}>{movie?.numberOfSeasons} Seasons</Text>
                            <MaterialIcons name="hd" size={24} color="white" />
                        </View>

                        <Pressable style={styles.play} onPress={() => { console.warn("Play") }} >
                            <Text style={styles.playButtonText}>
                                <Entypo name="controller-play" size={16} color="black" />
                                Play
                            </Text>
                        </Pressable>

                        <Pressable style={styles.download} onPress={() => { console.warn("Play") }} >
                            <Text style={styles.downloadButtonText}>
                                <AntDesign name="download" size={16} color="white" />
                                {" "}
                                Download
                            </Text>
                        </Pressable>

                        <View>
                            <Text>{movie?.plot}</Text>
                            <Text style={styles.cast}>{movie?.cast}</Text>
                            <Text style={styles.creator}>{movie?.creator}</Text>
                        </View>

                        {/* Row with ICON buttons */}
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <View style={{ alignItems: "center", margin: 20 }}>
                                <AntDesign name="plus" size={24} color="white" />
                                <Text>MyList</Text>
                            </View>

                            <View style={{ alignItems: "center", margin: 20 }}>
                                <Feather name="thumbs-up" size={24} color="white" />
                                <Text>Rate</Text>
                            </View>

                            <View style={{ alignItems: "center", margin: 20 }}>
                                <Ionicons name="share-social" size={24} color="white" />
                                <Text>Share</Text>
                            </View>
                        </View>

                        {currentSeason && (
                            <Picker
                                selectedValue={currentSeason.name}
                                itemStyle={{ height: 150, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setCurrentSeason(seasons[itemIndex])
                                }}
                            >
                                {seasonNames.map(seasonName => (
                                    <Picker.Item color="white" label={seasonName} value={seasonName} key={seasonName} />
                                ))}
                            </Picker>
                        )}
                    </View>
                )}
            />
        </View>
    )
}
export default MovieDetailsScreen
