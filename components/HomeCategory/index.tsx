import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styles from "./styles"
import { Text, View } from '../../components/Themed';
import { Category, Movie } from '../../src/models';
import { DataStore } from "aws-amplify"
import MovieItem from '../MovieItem';

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieItem movie={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}
