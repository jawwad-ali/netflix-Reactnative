import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { RootTabScreenProps } from '../../types';
// import categories from '../../assets/data/categories';
import HomeCategory from '../../components/HomeCategory';

import { DataStore } from "aws-amplify"
import { Category } from "../../src/models"

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // fetch CATEGORIES from datastore 
    const fetchCategories = async () => {
      setCategories(await DataStore.query(Category))
    }
    fetchCategories()
  }, [])

  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item }) => <HomeCategory category={item} />}
      />
    </>
  );
}