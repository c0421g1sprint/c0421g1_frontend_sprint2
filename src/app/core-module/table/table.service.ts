import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ITables} from "../../entity/ITables";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private urlTable = "http://localhost:8080/api/order/table";

  constructor(private http: HttpClient) {
  }

  randomTableNull(): Observable<ITables | any> {
    return this.http.get(this.urlTable);
  }

}
