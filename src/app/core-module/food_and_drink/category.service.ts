import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {ICategory} from "../../entity/ICategory";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlCategory = "http://localhost:8080/api/category/menu";
  private url = 'http://localhost:8080/api/category';

  private httpOptions;
  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'DUNG ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  getAll(): Observable<ICategory | any> {  //BaoHG
    return this.http.get(this.urlCategory);
  }

  //LinhDN hien thi danh sach category
  viewAllCategory(pageObj: any, code: String, name: String): Observable<ICategory[]|any>{
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&code=${code}&name=${name}`, this.httpOptions);
  }
  //LinhDN hien thi danh sach category khong co tham so
  viewAllCategoryNoAgrument(): Observable<ICategory[]|any>{
    return this.http.get(`${this.url}/listFull`, this.httpOptions);
  }

  //LinhDN xoa 1 category
  delete(id: number, category: ICategory): Observable<ICategory | any> {
    return this.http.patch(`${this.url}/delete/${id}`, category, this.httpOptions);
  }

  //xem 1 category
  detail(id: number): Observable<ICategory | any> {
    return this.http.get(`${this.url}/detail/${id}`, this.httpOptions);
  }

  //LamNT create
  create(newCategory: ICategory): Observable<ICategory | any> {
    return this.http.post(this.url + '/create', newCategory, this.httpOptions);
  }

  //LamNT update
  update(updateCategory: ICategory): Observable<ICategory | any> {
    return this.http.patch(this.url + '/update', updateCategory, this.httpOptions);
  }

  //LamNT findAllCategory
  findAllCategory(): Observable<ICategory[] | any> {
    return this.http.get(this.url + '/find-all', this.httpOptions);
  }

  //LamNT findById
  findCategoryById(id: number): Observable<ICategory | any> {
    return this.http.get(this.url + '/detail/' + id, this.httpOptions);
  }
}
