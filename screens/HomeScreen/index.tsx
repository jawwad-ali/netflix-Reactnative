import * as React from 'react';
import { FlatList } from 'react-native';

import { RootTabScreenProps } from '../../types';
import categories from '../../assets/data/categories';
import HomeCategory from '../../components/HomeCategory';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (  
    <> 
      <FlatList 
        data={categories.items}
        renderItem={({ item }) => <HomeCategory category={item} />} 
      />
    </>
  );
}