import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ICategory} from "../../entity/ICategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlCategory = "http://localhost:8080/api/category/menu";

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<ICategory | any> {
    return this.http.get(this.urlCategory);
  }
}
