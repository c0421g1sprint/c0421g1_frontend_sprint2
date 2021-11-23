import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ICategory} from "../../entity/ICategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) { }

  //LinhDN hien thi danh sach category
  viewAllCategory(pageObj: any, code: String, name: String): Observable<ICategory[]|any>{
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&code=${code}&name=${name}`);
  }
  //LinhDN hien thi danh sach category khong co tham so
  viewAllCategoryNoAgrument(): Observable<ICategory[]|any>{
    return this.http.get(`${this.url}/listFull`);
  }

  //LinhDN xoa 1 category
  delete(id: number, category: ICategory): Observable<ICategory | any> {
    return this.http.patch(`${this.url}/delete/${id}`, category);
  }

  //xem 1 category
  detail(id: number): Observable<ICategory | any> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

  //LamNT create
  create(newCategory: ICategory): Observable<ICategory | any> {
    return this.http.post(this.url + '/create', newCategory);
  }

  //LamNT update
  update(updateCategory: ICategory): Observable<ICategory | any> {
    return this.http.patch(this.url + '/update', updateCategory);
  }

  //LamNT findAllCategory
  findAllCategory(): Observable<ICategory[] | any> {
    return this.http.get(this.url + '/find-all');
  }

  //LamNT findById
  findCategoryById(id: number): Observable<ICategory | any> {
    return this.http.get(this.url + '/detail/' + id);
  }
}
