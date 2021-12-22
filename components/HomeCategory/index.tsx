import * as React from 'react';
import { FlatList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles"
import { Text, View } from '../../components/Themed';
import movie from '../../assets/data/movie';

interface HomeCategoryProps {
    category: {
        id: string
        title: string
        movies: {
            id: string,
            poster: string
        }[]
    }
}

export default function HomeCategory(props: HomeCategoryProps) {
    const { category } = props

    const navigation = useNavigation();
    // Go to the details of selectedMovie
    const onMoviePress = (movie) => {
        // console.log(movie.id)
        navigation.navigate("MovieDetailsScreen", { id: movie.id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={category.movies}
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