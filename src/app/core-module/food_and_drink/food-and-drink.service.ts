import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";

@Injectable({
  providedIn: 'root'
})
export class FoodAndDrinkService {
  // find-top-five-new
  // find-top-five-popular
  private url = "http://localhost:8080/api/food-and-drink"

  constructor(private http: HttpClient) {
  }

  //HaNTT: 19/11/2021 - get top 5 NEW food for homepage
  getFiveNewFood(): Observable<IFoodAndDrink[]|any> {
    return this.http.get(`${this.url}/find-top-five-new`)
  }

  //HaNTT: 19/11/2021 - get top 5 POPULAR food for homepage
  getFivePopularFood(): Observable<IFoodAndDrink[]|any> {
    return this.http.get(`${this.url}/find-top-five-popular`)
  }
}
