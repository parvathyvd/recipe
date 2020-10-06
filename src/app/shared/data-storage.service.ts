import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import { map,take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, 
    private recipeService: RecipeService,
    private authService : AuthService ){ }


  storeRecipes(){
    const recipes = this.recipeService.getRecipe()
    return this.http.put('https://ng-recipe-2277f.firebaseio.com/recipes.json',recipes)
    .subscribe( response => {
      console.log(response);
    })
  }

  fetchRecipes(){
    this.authService.user.pipe(take(1), 
    exhaustMap(user =>{
      return this.http.get<Recipe[]>('https://ng-recipe-2277f.firebaseio.com/recipes.json',
      {
        params: new HttpParams().set('auth', user.token)
      });
    }),
    map(recipes =>{
      return recipes.map((recipe) =>{
          return {...recipe, ingredients : recipe.ingredients? recipe.ingredients : []}
      })
    }))
    .subscribe( recipes =>{
      this.recipeService.setRecipe(recipes)
    })
  }
}
