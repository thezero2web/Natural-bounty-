export interface Nutrient {
  name: string;
  amount: string;
  unit: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  benefits: string;
  nutrients: Nutrient[];
  image_url: string;
  category: 'fruit' | 'vegetable' | 'meat' | 'resource';
  created_at: string;
}

export type ViewMode = 'client' | 'admin';
