// 1. Añadir propiedad comments
// 2. Crear e importar clase Comment
import { Comment } from './comment';
export class Dish {
  id: string;
  name: string;
  image: string;
  category: string;
  featured: boolean;
  label: string;
  price: string;
  description: string;
  comments: Comment[];
}
