import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IFeedback} from "../../entity/IFeedback";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private API_FEED_BACK = 'http://localhost:8080/api/feed-back';
  private url2 = "http://localhost:8080/api/feed-back/add";
  private httpOptions;
  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'DUNG ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  //QuanTA
  findAllFeedBack(inputDate : String, currentPage : number): Observable<IFeedback[] | any> {
    return this.http.get(this.API_FEED_BACK + '/list-by-date/' + inputDate +'/?page='+ currentPage, this.httpOptions);
  }

  //QuanTa
  findFeedBackById(id : number) : Observable<IFeedback> | any{
    return this.http.get(this.API_FEED_BACK + "/find-feed-back-by-id/" + id, this.httpOptions);
  }

  //DiepLV
  saveFeedback(feedback: IFeedback): Observable<IFeedback | any> {
    return this.http.post(this.API_FEED_BACK+"/add", feedback);
  }
}
