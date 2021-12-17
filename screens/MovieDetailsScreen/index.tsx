import React, { useState } from "react"
import { Text, View } from '../../components/Themed';
import styles from "./style"
import movie from "../../assets/data/movie";
import { FlatList, Image, Pressable, ScrollView } from "react-native";
import { MaterialIcons, Entypo, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import EpisodeItem from "../../components/EpisodeItem";
import { Picker } from '@react-native-picker/picker';

function MovieDetailsScreen() {

    const firstSeason = movie.seasons.items[0]
    const firstEpisode = firstSeason.episodes.items[0]

    // season name for the Picker
    const seasonName = movie.seasons.items.map(season => season.name)

    // current season
    const [currentSeason, setCurrentSeason] = useState(firstSeason)
    return (
        <View>
            <Image
                source={{ uri: firstEpisode.poster }}
                style={styles.image}
            />

            <FlatList
                data={currentSeason.episodes.items}
                renderItem={({ item }) => <EpisodeItem episode={item} />}
                style={{ marginBottom: 250 }}
                ListHeaderComponent={(
                    <View style={{ padding: 12 }}>
                        <Text style={styles.title}>{movie.title}</Text>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.match}>98% match</Text>
                            <Text style={styles.year}>{movie.year}</Text>

                            <View style={styles.ageContainer}>
                                <Text style={styles.age}>12+</Text>
                            </View>

                            <Text style={styles.year}>{movie.numberOfSeasons} Seasons</Text>
                            <MaterialIcons name="hd" size={24} color="white" />
                        </View>

                        {/* Play Button */}
                        <Pressable style={styles.play} onPress={() => { console.warn("Play") }} >
                            <Text style={styles.playButtonText}>
                                <Entypo name="controller-play" size={16} color="black" />
                                Play
                            </Text>
                        </Pressable>

                        {/* Download Button */}
                        <Pressable style={styles.download} onPress={() => { console.warn("Play") }} >
                            <Text style={styles.downloadButtonText}>
                                <AntDesign name="download" size={16} color="white" />
                                {" "}
                                Download
                            </Text>
                        </Pressable>

                        <View>
                            <Text>{movie.plot}</Text>
                            <Text style={styles.cast}>{movie.cast}</Text>
                            <Text style={styles.creator}>{movie.creator}</Text>
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

                        {/* Picker */}
                        <Picker
                            selectedValue={currentSeason.name}
                            itemStyle={{ height: 150, width: 250 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setCurrentSeason(movie.seasons.items[itemIndex])
                            }>
                            {seasonName.map(seasonNames => (
                                <Picker.Item color="white" label={seasonNames} value={seasonNames} key={seasonNames} />
                            ))}
                        </Picker>
                    </View>
                )}
            />
        </View>
    )
}

export default MovieDetailsScreen