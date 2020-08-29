import { NavigationParams } from 'react-navigation';

export default interface MealsNavigationParams extends NavigationParams {
  categoryId: string;
  mealId: string;
  save: () => {isGluttenFree: boolean, isVegan: boolean, isVegetarian: boolean};
}