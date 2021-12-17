import * as React from 'react';
import { FlatList, Image } from 'react-native';

import styles from "./styles"
import { Text, View } from '../../components/Themed';

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={category.movies}
                renderItem={({ item }) => (
                    <Image style={styles.image} source={{ uri: item.poster }} />
                )}
                horizontal 
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}