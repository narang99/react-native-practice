import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Meal from '../models/Meal';
import MealItem from './MealItem';
import { MEALS } from '../dummy_data/dummy';

interface MealListProps {
  onPress: (item: Meal, index: number) => void;
  filterMeals: (item: Meal, index: number) => boolean;
};

const styles = StyleSheet.create({
  listStyle: {
    flexGrow: 1,
    alignContent: "center",
    paddingBottom: 30,
  },
});

const MealList: React.FC<MealListProps> = (props) => {
  const displayMeals = MEALS.filter(props.filterMeals);

  const renderMealItems = (item: Meal, index: number) => {
    return <MealItem item={item} index={index} onPress={props.onPress} />;
  };

  return (
      <FlatList
        data={displayMeals}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderMealItems(item.item, item.index)}
        contentContainerStyle={styles.listStyle}
      />
  );
};

export default MealList;