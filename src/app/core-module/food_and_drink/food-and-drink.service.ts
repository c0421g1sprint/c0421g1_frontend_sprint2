import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";

@Injectable({
  providedIn: 'root'
})
export class FoodAndDrinkService {

  url = "http://localhost:8080/api/food-and-drink";

  constructor(private http: HttpClient) { }

  //LamNT create
  create(newFoodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.post(this.url + 'create', newFoodAndDrink);
  }

  //LamNT update
  update(updateFoodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.patch(this.url + 'update', updateFoodAndDrink);
  }
}
