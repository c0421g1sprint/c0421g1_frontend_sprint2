import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";

@Injectable({
  providedIn: 'root'
})
export class FoodAndDrinkService {
  private urlfoodTheoCategory = "http://localhost:8080/api/food-and-drink";
  private urlFoodById = "http://localhost:8080/api/food-and-drink/food";
  private urlAllFood = "http://localhost:8080/api/food-and-drink/allFood";
  constructor(private http: HttpClient) {
  }
  getAllFoodAndDrink():Observable<IFoodAndDrink[] | any>{
    return this.http.get(this.urlAllFood)
  }

  getFoodAndDinkTheoCategory(id: number): Observable<IFoodAndDrink | any> {
    return this.http.get(this.urlfoodTheoCategory + "/" + id);
  }
  getFoodById(id:number):Observable<IFoodAndDrink | any>{
    return this.http.get(this.urlFoodById + "/" + id);
  }

}
