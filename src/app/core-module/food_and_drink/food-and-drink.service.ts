import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";

@Injectable({
  providedIn: 'root'
})
export class FoodAndDrinkService {
  private urlfoodTheoCategory = "http://localhost:8080/api/food-and-drink"; //BaoHG
  private urlFoodById = "http://localhost:8080/api/food-and-drink/food"; //BaoHG
  private urlAllFood = "http://localhost:8080/api/food-and-drink/allFood"; //BaoHG
  private urlSearch = "http://localhost:8080/api/food-and-drink/search/food?search="; //BaoHG

  constructor(private http: HttpClient) {
  }

  getAllFoodAndDrink(): Observable<IFoodAndDrink[] | any> { //BaoHG
    return this.http.get(this.urlAllFood)
  }

  getFoodAndDinkTheoCategory(id: number): Observable<IFoodAndDrink | any> { //BaoHG
    return this.http.get(this.urlfoodTheoCategory + "/" + id);
  }

  getFoodById(id: number): Observable<IFoodAndDrink | any> { //BaoHG
    return this.http.get(this.urlFoodById + "/" + id);
  }

  searchFood(search: string): Observable<IFoodAndDrink | any> { //BaoHG
    return this.http.get(this.urlSearch  + search);
  }

}
