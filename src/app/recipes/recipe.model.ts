import {Ingredients} from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredients[]

    constructor(name: string, desc: string, img: string, ingredients:Ingredients[]){
        this.name = name;
        this.description = desc;
        this.imagePath = img;
        this.ingredients = ingredients;
    }
}