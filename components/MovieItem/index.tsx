import React, { useState, useEffect } from 'react';
import { Text, View } from '../../components/Themed';
import { Image, Pressable } from 'react-native';
import { ActivityIndicator } from "react-native"

import { useNavigation } from '@react-navigation/native';

import styles from "./styles"
 
import { Movie } from '../../src/models';

import { Storage } from "aws-amplify"

function MovieItem({ movie }: { movie: Movie }) {

    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState("")

    // Go to the details of selectedMovie
    const onMoviePress = () => {
        navigation.navigate("MovieDetailsScreen", { id: movie.id })
    }

    useEffect(() => {
        console.log("movie.poster", movie.poster)

        if (movie.poster.startsWith("http")) {
            setImageUrl(movie.poster)
            return 
        }

        Storage.get(movie.poster).then(setImageUrl)
        // Storage.get("imperial-dreams-2014.jpg").then(setImageUrl)
    }, [])

    return (
        <View>
            <Pressable onPress={onMoviePress}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
            </Pressable>
        </View>
    )
}

export default MovieItem
