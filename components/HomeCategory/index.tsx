import React, { useState, useEffect } from 'react';
import { FlatList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles"
import { Text, View } from '../../components/Themed';
import movie from '../../assets/data/movie';
import { Category, Movie } from '../../src/models';
import { DataStore } from "aws-amplify"

interface HomeCategoryProps {
    category: Category
}

export default function HomeCategory(props: HomeCategoryProps) {
    const { category } = props

    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const fetchMovies = async () => {
            // fetching the movie that are matching with their category
            const result = (await DataStore.query(Movie)).filter(movie => movie.categoryID === category.id)
            setMovies(result);
        }
        fetchMovies()
    }, [])

    const navigation = useNavigation();
    // Go to the details of selectedMovie
    const onMoviePress = (movie: Movie) => {
        // console.log(movie.id)
        navigation.navigate("MovieDetailsScreen", { id: movie.id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <Pressable onPress={() => onMoviePress(item)}>
                        <Image style={styles.image} source={{ uri: item.poster }} />
                    </Pressable>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}
// 2.34