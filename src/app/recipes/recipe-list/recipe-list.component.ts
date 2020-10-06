import { Component, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Router,ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  
  recipe: Recipe[];
  subscription : Subscription

  constructor(private recipeService: RecipeService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe();
    this.subscription = this.recipeService.recipeChanged
    .subscribe( (recipe: Recipe[] ) =>{
        this.recipe = recipe
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

}
