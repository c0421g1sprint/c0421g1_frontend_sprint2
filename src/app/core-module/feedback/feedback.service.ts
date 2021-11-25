import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IFeedback} from "../../entity/IFeedback";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url2 = "http://localhost:8080/api/feed-back/add";
  private url1 = "http://localhost:8080/api/feed-back";
  private API_FEED_BACK = 'http://localhost:8080/api/feed-back';


  private httpOptions;


  constructor(private http: HttpClient) {this.httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }; }
  saveFeedback(feedback: IFeedback): Observable<IFeedback | any> {
    return this.http.post(this.url2, feedback, this.httpOptions);
  }
  //check code trùng:
  isCodeDuplicated(feedbackCode: String): Observable<IFeedback | any> {
    return this.http.get(`${this.url1}/find-class-room?feedbackCode=${feedbackCode}`, this.httpOptions)
  }
  private codeService = new BehaviorSubject('');
  currentFeedback = this.codeService.asObservable();

  changeCode(feedbackCode: string) {
    this.codeService.next(name);
  }
  findAllFeedBack(inputDate : String, currentPage : number): Observable<IFeedback[] | any> {
    return this.http.get(this.API_FEED_BACK + '/list-by-date/' + inputDate +'/?page='+ currentPage);
  }

  findFeedBackById(id : number) : Observable<IFeedback> | any{
    return this.http.get(this.API_FEED_BACK + "/find-feed-back-by-id/" + id);
  }


}
