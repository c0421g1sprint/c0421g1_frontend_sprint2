import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from "../../entity/ICategory";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:8080/api/category";

  constructor(private http: HttpClient) {
  }

  //LamNT create
  create(newCategory: ICategory): Observable<ICategory | any> {
    return this.http.post(this.url + 'create', newCategory);
  }

  //LamNT update
  update(updateCategory: ICategory): Observable<ICategory | any> {
    return this.http.patch(this.url + 'update', updateCategory);
  }
}
