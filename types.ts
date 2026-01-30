export interface Exercise {
  id: string;
  name: string;
  type: string;
  image: string;
  category: 'Chest' | 'Back' | 'Biceps' | 'Triceps' | 'Legs';
}

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealSection {
  title: string;
  calories: number;
  items: MealItem[];
}

export interface UserMetrics {
  age: number;
  weight: number;
  height: number;
  goal: string;
  unitWeight: 'KG' | 'LBS';
  unitHeight: 'CM' | 'FT';
}

export interface UserProfile {
  id: string;
  full_name: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  unit_weight: 'KG' | 'LBS';
  unit_height: 'CM' | 'FT';
}