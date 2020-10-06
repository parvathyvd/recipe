import {Ingredients} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppinglistService{
 
 ingredientChanged = new Subject<Ingredients[]>();
 editItemIndex = new Subject<number>();

    private ingredients:Ingredients[] = [
        new Ingredients('Apple', 10),
        new Ingredients('Orange', 15),
      ];

      getIngredients(){
          return this.ingredients.slice()
      }

      getIngredient(index: number){
        return this.ingredients[index]
      }

      onIngradientAdd(ingredient: Ingredients){
        this.ingredients.push(ingredient)
        this.ingredientChanged.next(this.ingredients.slice())
      }

      addIngredients(ingredient: Ingredients[]){
          //Add ingredients
        //  for (let ingred of ingredient) {
        //      this.onIngradientAdd(ingred);
        //  }
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
      }

      updateIngredients(index:number, newIngredient:Ingredients){
        this.ingredients[index] = newIngredient
        this.ingredientChanged.next(this.ingredients.slice())
      }
      deleteIngredients(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice())
      }
}