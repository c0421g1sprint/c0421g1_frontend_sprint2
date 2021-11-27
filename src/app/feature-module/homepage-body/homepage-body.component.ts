import { Component, OnInit } from '@angular/core';
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";
import {FoodAndDrinkService} from "../../core-module/food_and_drink/food-and-drink.service";

@Component({
  selector: 'app-homepage-body',
  templateUrl: './homepage-body.component.html',
  styleUrls: ['./homepage-body.component.css']
})
export class HomepageBodyComponent implements OnInit {
  //HaNTT: 19/11/2021 - get top 5 food for homepage
  fiveNewFoodList: IFoodAndDrink[] =[];
  fivePopularFoodList: IFoodAndDrink[] =[];
  topPopularFood: IFoodAndDrink;
  fourPopularFood: IFoodAndDrink[] =[];



  constructor(private foodAndDrinkService: FoodAndDrinkService) { }

  ngOnInit(): void {
    this.getTopFiveNew();
    this.getTopFivePopular();

  }

  //HaNTT: 19/11/2021 - get top 5 NEW food for homepage
   getTopFiveNew(){
    this.foodAndDrinkService.getFiveNewFood().subscribe(data=> {
      this.fiveNewFoodList = data;
    })
  }

  //HaNTT: 19/11/2021 - get top 5 POPULAR food for homepage
  getTopFivePopular() {
    this.foodAndDrinkService.getFivePopularFood().subscribe(data=> {
      this.fivePopularFoodList = data;
      this.topPopularFood = data.shift();
      this.fourPopularFood = this.fivePopularFoodList;
    })
  }
}
