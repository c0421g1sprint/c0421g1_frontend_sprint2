import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFeedback} from "../../entity/IFeedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private API_FEED_BACK = 'http://localhost:8080/api/feed-back';
  private url2 = "http://localhost:8080/api/feed-back/add";

  constructor(private http: HttpClient) { }

  //QuanTA
  findAllFeedBack(inputDate : String, currentPage : number): Observable<IFeedback[] | any> {
    return this.http.get(this.API_FEED_BACK + '/list-by-date/' + inputDate +'/?page='+ currentPage);
  }

  //QuanTa
  findFeedBackById(id : number) : Observable<IFeedback> | any{
    return this.http.get(this.API_FEED_BACK + "/find-feed-back-by-id/" + id);
  }

  //DiepLV
  saveFeedback(feedback: IFeedback): Observable<IFeedback | any> {
    return this.http.post(this.url2, feedback, this.httpOptions);
  }
}
