import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class FoodAndDrinkService {
  private urlfoodTheoCategory = "http://localhost:8080/api/food-and-drink"; //BaoHG
  private urlFoodById = "http://localhost:8080/api/food-and-drink/food"; //BaoHG
  private urlAllFood = "http://localhost:8080/api/food-and-drink/allFood"; //BaoHG
  private urlSearch = "http://localhost:8080/api/food-and-drink/search/food?search="; //BaoHG
  private url = "http://localhost:8080/api/food-and-drink"
  private httpOptions;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'DUNG ' + `${this.storageService.getToken()}`
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  //HaNTT: 19/11/2021 - get top 5 NEW food for homepage
  getFiveNewFood(): Observable<IFoodAndDrink[] | any> {
    return this.http.get(`${this.url}/find-top-five-new`, this.httpOptions)
  }

  //HaNTT: 19/11/2021 - get top 5 POPULAR food for homepage
  getFivePopularFood(): Observable<IFoodAndDrink[] | any> {
    return this.http.get(`${this.url}/find-top-five-popular`, this.httpOptions)
  }

  //LinhDN hien thi danh sach fad
  viewAllFoodAndDrink(pageObj: any, code: String, name: String, price: number, id: number): Observable<IFoodAndDrink[] | any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&code=${code}&name=${name}&price=${price}&id=${id}`, this.httpOptions);
  }

  //LinhDN hien thi danh sach fad khong co id category
  viewAllFoodAndDrinkNoId(pageObj: any, code: String, name: String, price: number): Observable<IFoodAndDrink[] | any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&code=${code}&name=${name}&price=${price}`, this.httpOptions);
  }

  //LinhDN xoa 1 fad
  delete(id: number, foodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.patch(`${this.url}/delete/${id}`, foodAndDrink, this.httpOptions);
  }

  //xem 1 fad
  detail(id: number): Observable<IFoodAndDrink | any> {
    return this.http.get(`${this.url}/detail/${id}`, this.httpOptions);
  }

  //LamNT create
  create(newFoodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.post(this.url + '/create', newFoodAndDrink, this.httpOptions);
  }

  //LamNT update
  update(updateFoodAndDrink: IFoodAndDrink): Observable<IFoodAndDrink | any> {
    return this.http.patch(this.url + '/update', updateFoodAndDrink, this.httpOptions);
  }

  //LamNT FindById
  findById(id: number): Observable<IFoodAndDrink | any> {
    return this.http.get(this.url + '/detail/' + id, this.httpOptions)
  }

  getAllFoodAndDrink(): Observable<IFoodAndDrink[] | any> { //BaoHG
    return this.http.get(this.urlAllFood, this.httpOptions)
  }

  getFoodAndDinkTheoCategory(id: number): Observable<IFoodAndDrink | any> { //BaoHG
    return this.http.get(this.urlfoodTheoCategory + "/" + id, this.httpOptions);
  }

  getFoodById(id: number): Observable<IFoodAndDrink | any> { //BaoHG
    return this.http.get(this.urlFoodById + "/" + id, this.httpOptions);
  }

  searchFood(search: string): Observable<IFoodAndDrink | any> { //BaoHG
    return this.http.get(this.urlSearch + search, this.httpOptions);
  }

}
