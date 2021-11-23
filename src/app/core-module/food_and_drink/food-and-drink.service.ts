import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";

@Injectable({
  providedIn: 'root'
})
export class FoodAndDrinkService {
  private url = 'http://localhost:8080/api/food-and-drink';

  constructor(private http: HttpClient) { }
  //LinhDN hien thi danh sach fad
  viewAllFoodAndDrink(pageObj: any, code: String, name: String, price: number, id: number): Observable<IFoodAndDrink[]|any>{
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&code=${code}&name=${name}&price=${price}&id=${id}`);
  }

  //LinhDN hien thi danh sach fad khong co id category
  viewAllFoodAndDrinkNoId(pageObj: any, code: String, name: String, price: number): Observable<IFoodAndDrink[]|any>{
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&code=${code}&name=${name}&price=${price}`);
  }

  //LinhDN xoa 1 fad
  delete(id: number, foodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.patch(`${this.url}/delete/${id}`, foodAndDrink);
  }

  //xem 1 fad
  detail(id: number): Observable<IFoodAndDrink | any> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

  //LamNT create
  create(newFoodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.post(this.url + '/create', newFoodAndDrink);
  }

  //LamNT update
  update(updateFoodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.patch(this.url + '/update', updateFoodAndDrink);
  }

  //LamNT FindById
  findById(id: number): Observable<IFoodAndDrink | any> {
    return this.http.get(this.url + '/detail/' + id)
  }
}
