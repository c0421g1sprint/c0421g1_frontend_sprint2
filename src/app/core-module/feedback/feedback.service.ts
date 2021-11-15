import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IFeedback} from "../../entity/IFeedback";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url2 = "http://localhost:8080/api/feed-back/add";
  private url1 = 'http://localhost:8080/api/feed-back';

  private httpOptions;


  constructor(private http: HttpClient) {this.httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }; }
  saveFeedback(feedback: IFeedback): Observable<IFeedback | any> {
    return this.http.post(this.url2, feedback, this.httpOptions);
  }
  findAll() :Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>(this.url1);
  }
}
