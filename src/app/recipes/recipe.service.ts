import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()


export class RecipeService{
  recipeChanged  = new Subject<Recipe[]>();


 private recipes:Recipe[] = [];
// 'Paneer',
//  'Tasty Crispy Paneer Fry',
//  'https://i.ytimg.com/vi/5pGBL60jZw8/maxresdefault.jpg',
//  [new Ingredients('Paneer', 12),
//  new Ingredients('Fries', 30)]
//  ),
//  new Recipe(
// 'Dosa',
//  'Crispy Dosa',
//  'https://i.ytimg.com/vi/CCab5oh0ZOc/maxresdefault.jpg',
//  [new Ingredients('Dosa', 3),
//  new Ingredients('Chutney', 4)]
//  )]

 constructor(private shoppinglistService: ShoppinglistService) {}

  getRecipe(){
      return this.recipes.slice();
  }  

  getRecipeById(index: number){
    return this.recipes[index];
  }

  setRecipe(recipes : Recipe[]){
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1)
    this.recipeChanged.next(this.recipes.slice())
  }
  
  addIngredientsToShoppinglist(ingre: Ingredients[]){
    console.log(ingre)
    this.shoppinglistService.addIngredients(ingre)
  }
}