import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredients} from '../shared/ingredient.model';
import {ShoppinglistService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredients[];
  igChangeSubscription : Subscription

  constructor(private shoppingListService: ShoppinglistService) { }

  ngOnInit(): void {
      this.ingredients = this.shoppingListService.getIngredients();
      this.igChangeSubscription = this.shoppingListService.ingredientChanged
      .subscribe((ingredients: Ingredients[]) =>{
        this.ingredients = ingredients;
      }
      )
  }

  onEditItem(index: number){
    this.shoppingListService.editItemIndex.next(index);
  }

  ngOnDestroy(): void{
    this.igChangeSubscription.unsubscribe();
  }


}
