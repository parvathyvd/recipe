import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppinglistService: ShoppinglistService) {}
  editSubscription:Subscription;
  editMode = false;
  editItemIndex:number;
  editItem:Ingredients
  @ViewChild('f') slForm: NgForm

  ngOnInit(): void {
    this.editSubscription = this.shoppinglistService.editItemIndex.
    subscribe((index:number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem = this.shoppinglistService.getIngredient(index);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    })
  }

  ngOnDestroy(){
    this.editSubscription.unsubscribe();
  }

  /****using @ViewChild */
  onAdd(form: NgForm){
    console.log('clicked');
    const value = form.value
    
    const newIngredientAdded = new Ingredients(value.name, value.amount);
    if(this.editMode){
      this.shoppinglistService.updateIngredients(this.editItemIndex, newIngredientAdded)
    }
    else{
      this.shoppinglistService.onIngradientAdd(newIngredientAdded);
    }  
    this.editMode =false;
    this.slForm.reset()
  }

  onClear(){
    this.editMode =false;
    this.slForm.reset()
  }


  /****using @LocalRef */

  // onAdded(name:string,amount: number){
  //       const nameInputAdded = (<HTMLInputElement>name).value;
  //      console.log(nameInputAdded);
  // }

  onDelete(){
    console.log(this.editItemIndex)
    this.shoppinglistService.deleteIngredients(this.editItemIndex)
    this.onClear();
  }
}
